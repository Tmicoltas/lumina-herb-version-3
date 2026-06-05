import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { getProductById, getRelatedProducts } from '../data/products'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase/client'
import { friendlySupabaseError } from '../lib/supabase/errors'

type ProductReview = {
  id: number
  product_id: string
  user_id: string
  user_name: string
  comment: string
  created_at: string
}

export function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { add } = useCart()
  const { user } = useAuth()
  const product = productId ? getProductById(productId) : undefined
  const [qty, setQty] = useState(1)
  const [reviews, setReviews] = useState<ProductReview[]>([])
  const [reviewText, setReviewText] = useState('')
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [reviewMessage, setReviewMessage] = useState('')

  async function loadReviews(nextProductId: string) {
    setReviewsLoading(true)
    setReviewError('')
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, product_id, user_id, user_name, comment, created_at')
        .eq('product_id', nextProductId)
        .order('created_at', { ascending: false })

      if (error) {
        throw new Error(friendlySupabaseError(error, 'Could not load reviews.'))
      }

      setReviews(data ?? [])
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Could not load reviews.')
    } finally {
      setReviewsLoading(false)
    }
  }

  useEffect(() => {
    if (productId) {
      void Promise.resolve().then(() => loadReviews(productId))
    }
  }, [productId])

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

  async function handleReviewSubmit(e: FormEvent) {
    e.preventDefault()
    if (!user || !product) return
    const comment = reviewText.trim()
    if (!comment) {
      setReviewError('Please write a review before submitting.')
      return
    }

    setReviewSubmitting(true)
    setReviewError('')
    setReviewMessage('')
    try {
      const { error } = await supabase.from('reviews').insert({
        product_id: product.id,
        user_id: user.id,
        user_name: user.displayName,
        comment,
      })

      if (error) {
        throw new Error(friendlySupabaseError(error, 'Could not save your review.'))
      }

      setReviewText('')
      setReviewMessage('Review posted successfully.')
      await loadReviews(product.id)
    } catch (err) {
      setReviewError(err instanceof Error ? err.message : 'Could not save your review.')
    } finally {
      setReviewSubmitting(false)
    }
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

          <div className="lh-pdp-section lh-reviews">
            <h3>Reviews</h3>
            {user ? (
              <form onSubmit={handleReviewSubmit} className="lh-review-form">
                <label htmlFor="review-comment">Share your experience</label>
                <textarea
                  id="review-comment"
                  className="lh-input-dark lh-review-textarea"
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="How did this product fit into your ritual?"
                  required
                />
                {reviewError ? <p className="lh-error">{reviewError}</p> : null}
                {reviewMessage ? <p className="lh-success-text lh-success-text--dark">{reviewMessage}</p> : null}
                <button
                  type="submit"
                  className="lh-btn lh-btn--purple"
                  disabled={reviewSubmitting}
                >
                  {reviewSubmitting ? 'Posting...' : 'Post review'}
                </button>
              </form>
            ) : (
              <div className="lh-review-login">
                <p>Log in to write a review.</p>
                <Link to="/login" className="lh-btn lh-btn--purple">
                  Login
                </Link>
              </div>
            )}

            <div className="lh-review-list">
              {reviewsLoading ? (
                <p className="lh-pdp-desc">Loading reviews...</p>
              ) : reviews.length === 0 ? (
                <p className="lh-pdp-desc">No reviews yet.</p>
              ) : (
                reviews.map((review) => (
                  <article key={review.id} className="lh-review-card">
                    <div className="lh-review-card__head">
                      <strong>{review.user_name}</strong>
                      <span>
                        {new Date(review.created_at).toLocaleDateString(undefined, {
                          dateStyle: 'medium',
                        })}
                      </span>
                    </div>
                    <p>{review.comment}</p>
                  </article>
                ))
              )}
            </div>
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