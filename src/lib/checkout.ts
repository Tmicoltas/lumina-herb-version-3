export const FREE_SHIPPING_MIN = 100

export const SHIPPING_FLAT = 5

export function shippingForSubtotal(subtotal: number): number {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT
}