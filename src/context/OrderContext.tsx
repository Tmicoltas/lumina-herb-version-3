import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
  } from 'react'
  import type { Order, ShippingInfo } from '../types'
  import { shippingForSubtotal } from '../lib/checkout'
  
  type OrderContextValue = {
    orders: Order[]
    placeOrder: (items: Order['items'], shipping: ShippingInfo) => Order
  }
  
  const OrderContext = createContext<OrderContextValue | null>(null)
  
  function loadOrders(): Order[] {
    try {
      const raw = localStorage.getItem('lumina_orders')
      if (!raw) return []
      const parsed = JSON.parse(raw) as unknown[]
      if (!Array.isArray(parsed)) return []
      return parsed.map(normalizeOrder).filter(Boolean) as Order[]
    } catch {
      return []
    }
  }
  
  function normalizeOrder(raw: unknown): Order | null {
    if (!raw || typeof raw !== 'object') return null
    const o = raw as Record<string, unknown>
    if (
      typeof o.id !== 'string' ||
      typeof o.createdAt !== 'string' ||
      !Array.isArray(o.items) ||
      typeof o.totalAmount !== 'number' ||
      !o.shipping ||
      typeof o.shipping !== 'object'
    ) {
      return null
    }
    const shipping = o.shipping as ShippingInfo
    const subtotal =
      typeof o.subtotal === 'number' ? o.subtotal : Number(o.totalAmount) || 0
    const shippingFee =
      typeof o.shippingFee === 'number'
        ? o.shippingFee
        : Math.min(5, subtotal > 0 ? 5 : 0)
    const tax = typeof o.tax === 'number' ? o.tax : 0
    const status =
      o.status === 'delivered' || o.status === 'processing'
        ? o.status
        : 'processing'
    const est =
      typeof o.estimatedDelivery === 'string'
        ? o.estimatedDelivery
        : new Date(
            new Date(o.createdAt as string).getTime() + 5 * 86400000,
          ).toISOString()
    return {
      id: o.id as string,
      createdAt: o.createdAt as string,
      items: o.items as Order['items'],
      subtotal,
      shippingFee,
      tax,
      totalAmount: o.totalAmount as number,
      shipping,
      status,
      estimatedDelivery: est,
    }
  }
  
  function makeOrderId(): string {
    const n = Math.floor(10000 + Math.random() * 90000)
    return `LH-2026-${n}`
  }
  
  export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(loadOrders)
  
    const placeOrder = useCallback(
      (items: Order['items'], shipping: ShippingInfo): Order => {
        const subtotal = items.reduce(
          (s, row) => s + row.product.price * row.quantity,
          0,
        )
        const shippingFee = shippingForSubtotal(subtotal)
        const tax = 0
        const totalAmount = subtotal + shippingFee + tax
        const created = new Date()
        const estimatedDelivery = new Date(
          created.getTime() + 5 * 86400000,
        ).toISOString()
  
        const order: Order = {
          id: makeOrderId(),
          createdAt: created.toISOString(),
          items,
          subtotal,
          shippingFee,
          tax,
          totalAmount,
          shipping,
          status: 'processing',
          estimatedDelivery,
        }
        setOrders((prev) => {
          const next = [order, ...prev]
          localStorage.setItem('lumina_orders', JSON.stringify(next))
          return next
        })
        return order
      },
      [],
    )
  
    const value = useMemo(() => ({ orders, placeOrder }), [orders, placeOrder])
  
    return (
      <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
    )
  }
  
  // eslint-disable-next-line react-refresh/only-export-components -- useOrders pairs with OrderProvider
  export function useOrders() {
    const ctx = useContext(OrderContext)
    if (!ctx) throw new Error('useOrders must be used within OrderProvider')
    return ctx
  }
  