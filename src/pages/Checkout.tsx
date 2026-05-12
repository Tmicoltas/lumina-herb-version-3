import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { PRODUCTS } from '../data/products'
import { useCart } from '../context/CartContext'
import { useOrders } from '../context/OrderContext'
import { useAuth } from '../context/AuthContext'
import { shippingForSubtotal } from '../lib/checkout'
import type { PaymentMethod, ShippingInfo } from '../types'

export function CheckoutPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { lines, subtotal, clear } = useCart()
  const { placeOrder } = useOrders()
  const [pay, setPay] = useState<PaymentMethod>('card')
  const [form, setForm] = useState<ShippingInfo>({
    fullName: user?.displayName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    addressLine: '',
    city: '',
    postalCode: '',
  })

  const items = lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId)
      if (!product) return null
      return { product, quantity: line.quantity }
    })
    .filter(Boolean) as { product: (typeof PRODUCTS)[number]; quantity: number }[]

  const shippingFee = shippingForSubtotal(subtotal)
  const tax = 0
  const total = subtotal + shippingFee + tax

  function patch<K extends keyof ShippingInfo>(key: K, v: ShippingInfo[K]) {
    setForm((f) => ({ ...f, [key]: v }))
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (items.length === 0) return
    void pay
    const order = placeOrder(items, form)
    clear()
    navigate('/order-success', { replace: true, state: { order } })
  }

  if (items.length === 0) {
    return (
      <PageLayout headerTone="dark" footerTone="dark" mainClassName="lh-main--checkout">
        <div className="lh-checkout-inner">
          <p>Your cart is empty.</p>
          <Link to="/shop" className="lh-btn lh-btn--purple" style={{ marginTop: 16 }}>
            Shop collection
          </Link>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout headerTone="dark" footerTone="dark" mainClassName="lh-main--checkout">
      <div className="lh-checkout-inner">
        <h1>Checkout</h1>

        <form onSubmit={onSubmit}>
          <section className="lh-card-dark">
            <h2>Shipping Information</h2>
            <div className="lh-field-dark">
              <label htmlFor="co-name">Full Name</label>
              <input
                id="co-name"
                className="lh-input-dark"
                required
                placeholder="John Doe"
                value={form.fullName}
                onChange={(e) => patch('fullName', e.target.value)}
              />
            </div>
            <div className="lh-field-dark">
              <label htmlFor="co-addr">Address</label>
              <input
                id="co-addr"
                className="lh-input-dark"
                required
                placeholder="123 Main St"
                value={form.addressLine}
                onChange={(e) => patch('addressLine', e.target.value)}
              />
            </div>
            <div className="lh-row2">
              <div className="lh-field-dark">
                <label htmlFor="co-city">City</label>
                <input
                  id="co-city"
                  className="lh-input-dark"
                  required
                  placeholder="New York"
                  value={form.city}
                  onChange={(e) => patch('city', e.target.value)}
                />
              </div>
              <div className="lh-field-dark">
                <label htmlFor="co-zip">ZIP Code</label>
                <input
                  id="co-zip"
                  className="lh-input-dark"
                  required
                  placeholder="10001"
                  value={form.postalCode}
                  onChange={(e) => patch('postalCode', e.target.value)}
                />
              </div>
            </div>
            <div className="lh-field-dark">
              <label htmlFor="co-phone">Phone Number</label>
              <input
                id="co-phone"
                className="lh-input-dark"
                type="tel"
                placeholder="(555) 123-4567"
                value={form.phone}
                onChange={(e) => patch('phone', e.target.value)}
              />
            </div>
            <div className="lh-field-dark">
              <label htmlFor="co-email">Email</label>
              <input
                id="co-email"
                className="lh-input-dark"
                type="email"
                required
                value={form.email}
                onChange={(e) => patch('email', e.target.value)}
              />
            </div>
          </section>

          <section className="lh-card-dark">
            <h2>Payment Method</h2>
            <div className="lh-pay-toggle">
              <button
                type="button"
                className={pay === 'card' ? 'lh-pay-opt lh-pay-opt--on' : 'lh-pay-opt'}
                onClick={() => setPay('card')}
              >
              </button>
              <button
                type="button"
                className={pay === 'wallet' ? 'lh-pay-opt lh-pay-opt--on' : 'lh-pay-opt'}
                onClick={() => setPay('wallet')}
              >
              </button>
            </div>
            <div className="lh-field-dark">
              <label htmlFor="co-card">Card Number</label>
              <input
                id="co-card"
                className="lh-input-dark"
                placeholder="1234 5678 9012 3456"
                autoComplete="cc-number"
              />
            </div>
            <div className="lh-row2">
              <div className="lh-field-dark">
                <label htmlFor="co-exp">Expiry Date</label>
                <input
                  id="co-exp"
                  className="lh-input-dark"
                  placeholder="MM/YY"
                  autoComplete="cc-exp"
                />
              </div>
              <div className="lh-field-dark">
                <label htmlFor="co-cvv">CVV</label>
                <input
                  id="co-cvv"
                  className="lh-input-dark"
                  placeholder="123"
                  autoComplete="cc-csc"
                />
              </div>
            </div>
          </section>

          <section className="lh-card-dark" style={{ maxWidth: 420, margin: '0 auto' }}>
            <h2>Order Summary</h2>
            <div className="lh-sum-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="lh-sum-row">
              <span>Shipping</span>
              <span>${shippingFee.toFixed(2)}</span>
            </div>
            <div className="lh-sum-row">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="lh-sum-row lh-sum-row--total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button type="submit" className="lh-btn lh-btn--purple lh-btn--block" style={{ marginTop: 16 }}>
            </button>
            <p className="lh-sum-note">Your information is secure and encrypted.</p>
          </section>
        </form>
      </div>
    </PageLayout>
  )
}