// Monto mínimo requerido para obtener envío gratis
export const FREE_SHIPPING_MIN = 100

// Costo fijo de envío cuando no aplica envío gratis
export const SHIPPING_FLAT = 5

// Calcula el costo de envío según el subtotal de la compra
export function shippingForSubtotal(subtotal: number): number {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_MIN ? 0 : SHIPPING_FLAT
}