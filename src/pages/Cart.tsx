import { Link, useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { PRODUCTS } from '../data/products'
import { FREE_SHIPPING_MIN, shippingForSubtotal } from '../lib/checkout'
import { useCart } from '../context/CartContext'

export function CartPage() {
  const { lines, setQuantity, remove, subtotal } = useCart()
  const navigate = useNavigate()
  const shipping = shippingForSubtotal(subtotal)
  const total = subtotal + shipping

  const rows = lines
    .map((line) => {
      const product = PRODUCTS.find((p) => p.id === line.productId)
      if (!product) return null
      return { product, quantity: line.quantity }
    })
    .filter(Boolean) as { product: (typeof PRODUCTS)[number]; quantity: number }[]

  return (
    <PageLayout headerTone="dark" footerTone="dark" mainClassName="lh-main--cart">
      <div className="lh-cart-inner">
        <h1>Shopping Cart</h1>

        {rows.length === 0 ? (
          <>
            <p style={{ color: 'var(--lh-muted)' }}>Your cart is empty.</p>
            <Link to="/shop" className="lh-btn lh-btn--purple" style={{ marginTop: 16 }}>
              Continue shopping
            </Link>
          </>
        ) : (
          <>
            {rows.map(({ product, quantity }) => (
              <div key={product.id} className="lh-cart-item">
                <button
                  type="button"
                  className="lh-cart-item__trash"
                  onClick={() => remove(product.id)}
                  aria-label="Remove item"
                >
                  🗑
                </button>
                <img src={product.image} alt="" />
                <div>
                  <div className="lh-cart-item__cat">{product.shopCategory}</div>
                  <div className="lh-cart-item__name">{product.name}</div>
                  <div className="lh-cart-item__price">${product.price}</div>
                  <div className="lh-cart-item__qty">
                    <button
                      type="button"
                      className="lh-cart-qty-btn"
                      onClick={() => setQuantity(product.id, quantity - 1)}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span style={{ minWidth: 24, textAlign: 'center', fontWeight: 700 }}>
                      {quantity}
                    </span>
                    <button
                      type="button"
                      className="lh-cart-qty-btn"
                      onClick={() => setQuantity(product.id, quantity + 1)}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <Link to="/shop" className="lh-back" style={{ display: 'inline-flex', marginTop: 8 }}>
              ← Continue Shopping
            </Link>

            <div className="lh-cart-summary">
              <h2>Order Summary</h2>
              <div className="lh-sum-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="lh-sum-row">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="lh-sum-row lh-sum-row--total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                type="button"
                className="lh-btn lh-btn--purple lh-btn--block"
                style={{ marginTop: 16 }}
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </button>
              <p className="lh-sum-note">
                Free shipping on orders over ${FREE_SHIPPING_MIN}
              </p>
            </div>
          </>
        )}
      </div>
    </PageLayout>
  )
}