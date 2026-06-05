export type ShopCategory = 'Relax' | 'Sleep' | 'Skin' | 'Mood' | 'Rituals'

export type Product = {
  id: string
  name: string
  price: number
  image: string

  shopCategory: ShopCategory
  description: string
  badge?: string
  benefits: string[]
  ingredients: string[]
  howToUse: string

  wellnessTags: string[]
  relatedIds: string[]
}

export type CartLine = {
  productId: string
  quantity: number
}

export type ShippingInfo = {
  fullName: string
  email: string
  phone: string
  addressLine: string
  city: string
  postalCode: string
}

export type PaymentMethod = 'card' | 'wallet'

export type OrderStatus = 'processing' | 'delivered'

export type Order = {
  id: string
  createdAt: string
  items: { product: Product; quantity: number }[]
  subtotal: number
  shippingFee: number
  tax: number
  totalAmount: number
  shipping: ShippingInfo
  status: OrderStatus

  estimatedDelivery: string
}
