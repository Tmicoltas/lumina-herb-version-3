import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
  } from 'react'
  import type { Order, Product, ShippingInfo } from '../types'
  import { shippingForSubtotal } from '../lib/checkout'
  import { supabase } from '../lib/supabase/client'
  import { friendlySupabaseError } from '../lib/supabase/errors'
  import { PRODUCTS } from '../data/products'
  import { useAuth } from './AuthContext'
  
  type OrderContextValue = {
    orders: Order[]
    loading: boolean
    error: string
    refreshOrders: () => Promise<void>
    placeOrder: (items: Order['items'], shipping: ShippingInfo) => Promise<Order>
  }
  
  type OrderRow = {
    id: number
    user_id: string
    total: number
    created_at: string
    order_items: {
      id: number
      product_id: string
      quantity: number
      price: number
    }[]
  }
  
  const OrderContext = createContext<OrderContextValue | null>(null)
  
  function emptyShipping(userEmail = ''): ShippingInfo {
    return {
      fullName: '',
      email: userEmail,
      phone: '',
      addressLine: '',
      city: '',
      postalCode: '',
    }
  }
  
  function productForItem(productId: string, price: number): Product {
    const product = PRODUCTS.find((p) => p.id === productId)
    if (product) return product
  
    return {
      id: productId,
      name: productId,
      price,
      image: '',
      shopCategory: 'Rituals',
      description: '',
      benefits: [],
      ingredients: [],
      howToUse: '',
      wellnessTags: [],
      relatedIds: [],
    }
  }
  
  function toAppOrder(row: OrderRow, userEmail = ''): Order {
    const items = row.order_items.map((item) => ({
      product: productForItem(item.product_id, Number(item.price)),
      quantity: item.quantity,
    }))
    const subtotal = row.order_items.reduce(
      (sum, item) => sum + Number(item.price) * item.quantity,
      0,
    )
    const totalAmount = Number(row.total)
    const shippingFee = Math.max(0, totalAmount - subtotal)
    const created = new Date(row.created_at)
  
    return {
      id: String(row.id),
      createdAt: row.created_at,
      items,
      subtotal,
      shippingFee,
      tax: 0,
      totalAmount,
      shipping: emptyShipping(userEmail),
      status: 'processing',
      estimatedDelivery: new Date(created.getTime() + 5 * 86400000).toISOString(),
    }
  }
  
  export function OrderProvider({ children }: { children: ReactNode }) {
    const { user, loading: authLoading } = useAuth()
    const [orders, setOrders] = useState<Order[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
  
    const refreshOrders = useCallback(async () => {
      if (!user) {
        setOrders([])
        setError('')
        return
      }
  
      setLoading(true)
      setError('')
      const { data, error: ordersError } = await supabase
        .from('orders')
        .select(
          'id, user_id, total, created_at, order_items(id, product_id, quantity, price)',
        )
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
  
      if (ordersError) {
        const message = friendlySupabaseError(
          ordersError,
          'Could not load your orders.',
        )
        setError(message)
        setLoading(false)
        throw new Error(message)
      }
  
      setOrders(((data ?? []) as OrderRow[]).map((row) => toAppOrder(row, user.email)))
      setLoading(false)
    }, [user])
  
    useEffect(() => {
      if (authLoading) return
      queueMicrotask(() => {
        void refreshOrders().catch((err) => {
          console.error('Supabase orders query error:', err)
        })
      })
    }, [authLoading, refreshOrders])
  
    const placeOrder = useCallback(
      async (items: Order['items'], shipping: ShippingInfo): Promise<Order> => {
        if (!user) throw new Error('Please log in before checking out.')
        if (items.length === 0) throw new Error('Your cart is empty.')
  
        const subtotal = items.reduce(
          (sum, row) => sum + row.product.price * row.quantity,
          0,
        )
        const shippingFee = shippingForSubtotal(subtotal)
        const tax = 0
        const totalAmount = subtotal + shippingFee + tax
  
        const { data: orderRow, error: orderError } = await supabase
          .from('orders')
          .insert({
            user_id: user.id,
            total: totalAmount,
          })
          .select('id, user_id, total, created_at')
          .single()
  
        if (orderError) {
          throw new Error(
            friendlySupabaseError(orderError, 'Could not create your order.'),
          )
        }
  
        const { error: itemsError } = await supabase.from('order_items').insert(
          items.map((item) => ({
            order_id: orderRow.id,
            product_id: item.product.id,
            quantity: item.quantity,
            price: item.product.price,
          })),
        )
  
        if (itemsError) {
          throw new Error(
            friendlySupabaseError(itemsError, 'Could not save the order items.'),
          )
        }
  
        const created = new Date(orderRow.created_at)
        const order: Order = {
          id: String(orderRow.id),
          createdAt: orderRow.created_at,
          items,
          subtotal,
          shippingFee,
          tax,
          totalAmount,
          shipping,
          status: 'processing',
          estimatedDelivery: new Date(
            created.getTime() + 5 * 86400000,
          ).toISOString(),
        }
  
        setOrders((prev) => [order, ...prev])
        return order
      },
      [user],
    )
  
    const value = useMemo(
      () => ({ orders, loading, error, refreshOrders, placeOrder }),
      [orders, loading, error, refreshOrders, placeOrder],
    )
  
    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  }
  
  // eslint-disable-next-line react-refresh/only-export-components -- useOrders pairs with OrderProvider
  export function useOrders() {
    const ctx = useContext(OrderContext)
    if (!ctx) throw new Error('useOrders must be used within OrderProvider')
    return ctx
  }
  