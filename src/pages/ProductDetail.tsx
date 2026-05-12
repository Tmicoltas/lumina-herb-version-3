import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'

export function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const product = productId ? getProductById(productId) : undefined
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <PageLayout headerTone="dark" footerTone="dark" mainClassName="lh-main--pdp">
        <p style={{ padding: 24 }}>Product not found.</p>
        <Link to="/shop" className="lh-back" style={{ padding: '0 24px' }}>
          ← Back to shop
        </Link>
      </PageLayout>
    )
  }

  const item = product
  const related = getRelatedProducts(item)

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    add(item.id, qty)
    navigate('/cart')
  }

  return (
    <PageLayout
      headerTone="dark"
      footerTone="dark"
      mainClassName="lh-main--pdp"
      subHeader={
        <Link to="/shop" className="lh-back">
          ← Back
        </Link>
      }
    >
      <div className="lh-pdp-grid">
        <div className="lh-pdp-visual">
          <img src={item.image} alt="" />
        </div>
        <div>
          {item.badge ? <span className="lh-badge">{item.badge}</span> : null}
          <h1 className="lh-pdp-title">{item.name}</h1>
          <div className="lh-pdp-price">${item.price}</div>
          <p className="lh-pdp-desc">{item.description}</p>

          <div className="lh-qty-row">
            <span>Quantity</span>
            <div className="lh-qty">
              <button
                type="button"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease"
              >
                −
              </button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="Increase">
                +
              </button>
            </div>
          </div>

          <div className="lh-pdp-actions">
            <form onSubmit={handleAdd} style={{ margin: 0 }}>
              <button type="submit" className="lh-btn lh-btn--purple lh-btn--block">
                Add to Cart
              </button>
            </form>
            <Link to="/cart" className="lh-btn lh-btn--outline-dark lh-btn--block">
              View Cart
            </Link>
          </div>

          <div className="lh-pdp-section">
            <h3>Benefits</h3>
            <ul className="lh-pdp-benefits">
              {item.benefits.map((b) => (
                <li key={b}>
                  <span className="lh-check-icon">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="lh-pdp-section">
            <h3>Ingredients</h3>
            <div className="lh-tags">
              {item.ingredients.map((ing) => (
                <span key={ing} className="lh-tag">
                  {ing}
                </span>
              ))}
            </div>
          </div>

          <div className="lh-pdp-section">
            <h3>How to use</h3>
            <p className="lh-pdp-desc">{item.howToUse}</p>
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="lh-related">
          <h2>You might also like</h2>
          <div className="lh-related-grid">
            {related.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="lh-pcard">
                <span className="lh-pcard__blob" aria-hidden />
                <img src={p.image} alt="" className="lh-pcard__img" />
                <div className="lh-pcard__overlay">
                  <div className="lh-pcard__name">{p.name}</div>
                  <div className="lh-pcard__price">${p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </PageLayout>
  )
}