import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { PRODUCTS, getProductById } from '../data/products'
import type { CartLine } from '../types'

type CartContextValue = {
  lines: CartLine[]
  totalPieces: number
  subtotal: number
  add: (productId: string, qty?: number) => void
  setQuantity: (productId: string, quantity: number) => void
  remove: (productId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      const raw = localStorage.getItem('lumina_cart')
      return raw ? (JSON.parse(raw) as CartLine[]) : []
    } catch {
      return []
    }
  })

  const persistLines = useCallback((next: CartLine[]) => {
    setLines(next)
    localStorage.setItem('lumina_cart', JSON.stringify(next))
  }, [])

  const add = useCallback(
    (productId: string, qty = 1) => {
      const p = getProductById(productId)
      if (!p) return
      setLines((prev) => {
        const idx = prev.findIndex((l) => l.productId === productId)
        let next: CartLine[]
        if (idx === -1) next = [...prev, { productId, quantity: qty }]
        else {
          next = [...prev]
          next[idx] = {
            productId,
            quantity: prev[idx].quantity + qty,
          }
        }
        localStorage.setItem('lumina_cart', JSON.stringify(next))
        return next
      })
    },
    [],
  )

  const setQuantity = useCallback((productId: string, quantity: number) => {
    const q = Math.max(0, Math.floor(quantity))
    setLines((prev) => {
      let next: CartLine[]
      if (q === 0) next = prev.filter((l) => l.productId !== productId)
      else {
        const idx = prev.findIndex((l) => l.productId === productId)
        if (idx === -1) next = [...prev, { productId, quantity: q }]
        else {
          next = [...prev]
          next[idx] = { productId, quantity: q }
        }
      }
      localStorage.setItem('lumina_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const remove = useCallback((productId: string) => {
    setLines((prev) => {
      const next = prev.filter((l) => l.productId !== productId)
      localStorage.setItem('lumina_cart', JSON.stringify(next))
      return next
    })
  }, [])

  const clear = useCallback(() => {
    persistLines([])
  }, [persistLines])

  const totalPieces = useMemo(
    () => lines.reduce((s, l) => s + l.quantity, 0),
    [lines],
  )

  const subtotal = useMemo(() => {
    return lines.reduce((sum, line) => {
      const p = PRODUCTS.find((x) => x.id === line.productId)
      return sum + (p ? p.price * line.quantity : 0)
    }, 0)
  }, [lines])

  const value = useMemo(
    () => ({
      lines,
      totalPieces,
      subtotal,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [lines, totalPieces, subtotal, add, setQuantity, remove, clear],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}