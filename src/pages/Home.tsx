import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import {
  HOME_FEATURED,
  HOME_IMAGES,
  HOME_WELLNESS_GOALS,
} from '../data/homeContent'
import { getProductById } from '../data/products'

export function HomePage() {
  const [email, setEmail] = useState('')
  const [signedUp, setSignedUp] = useState(false)

  function onNewsletter(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSignedUp(true)
    setEmail('')
  }

  return (
    <PageLayout
      headerTone="dark"
      footerTone="light"
      footerLayout="marketing"
      mainClassName="lh-main--marketing-home"
    >
      <div className="lh-mh">
        <section className="lh-mh-hero" aria-labelledby="mh-hero-title">
          <h1 id="mh-hero-title">
            Natural balance through plant-based wellness
          </h1>
          <Link className="lh-mh-hero__cta" to="/shop">
            Shop collection
          </Link>
          <div className="lh-mh-hero__img-wrap">
            <img
              src={HOME_IMAGES.hero}
              alt=""
              width={1200}
              height={1200}
              loading="eager"
            />
          </div>
        </section>

        <section className="lh-mh-values" aria-label="Why Lumina Herb">
          <div className="lh-mh-value">
            <div className="lh-mh-value__icon lh-mh-value__icon--g" aria-hidden>
              🌿
            </div>
            <div>
              <h3>Pure botanical extracts</h3>
              <p>
                Thoughtfully formulated blends rooted in transparency and plant science.
              </p>
            </div>
          </div>
          <div className="lh-mh-value">
            <div className="lh-mh-value__icon lh-mh-value__icon--p" aria-hidden>
              ✦
            </div>
            <div>
              <h3>Ethically sourced</h3>
              <p>
                Partners who respect soil, harvest cycles, and the people behind every batch.
              </p>
            </div>
          </div>
          <div className="lh-mh-value">
            <div className="lh-mh-value__icon lh-mh-value__icon--y" aria-hidden>
              ◎
            </div>
            <div>
              <h3>Planet friendly</h3>
              <p>
                Packaging and processes designed to tread lightly from lab to doorstep.
              </p>
            </div>
          </div>
        </section>

        <section className="lh-mh-ritual">
          <div className="lh-mh-ritual__text">
            <h2>Create your daily wellness ritual</h2>
            <p>
              Small moments add up: a calming oil at sunset, a serum before sleep, a deep breath
              with your morning balm. Lumina Herb is here to help you build a rhythm that feels
              honest, gentle, and yours.
            </p>
            <Link className="lh-mh-link-green" to="/shop">
              Discover rituals <span aria-hidden>→</span>
            </Link>
          </div>
          <div className="lh-mh-ritual__img">
            <img
              src={HOME_IMAGES.ritual}
              alt=""
              width={900}
              height={1200}
              loading="lazy"
            />
          </div>
        </section>

        <section className="lh-mh-goals" aria-labelledby="mh-goals-title">
          <h2 id="mh-goals-title">Shop by wellness goal</h2>
          <p>Find the right products for your needs</p>
          <div className="lh-mh-goals__grid">
            {HOME_WELLNESS_GOALS.map((g) => (
              <Link
                key={g.slug}
                to={`/shop?category=${encodeURIComponent(g.slug)}`}
                className={`lh-mh-goal-card lh-mh-goal-card--${g.tint}`}
              >
                <span className="lh-mh-goal-card__icon" aria-hidden>
                  {g.icon}
                </span>
                {g.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="lh-mh-featured" aria-labelledby="mh-featured-title">
          <div className="lh-mh-featured__head">
            <h2 id="mh-featured-title">Featured products</h2>
            <Link to="/shop">View all</Link>
          </div>
          <div className="lh-mh-featured__grid">
            {HOME_FEATURED.map((row) => {
              const p = getProductById(row.productId)
              if (!p) return null
              return (
                <Link
                  key={row.productId}
                  to={`/shop/${row.productId}`}
                  className="lh-mh-fprod"
                >
                  <div className="lh-mh-fprod__img">
                    <img src={p.image} alt="" width={640} height={640} loading="lazy" />
                  </div>
                  <div className="lh-mh-fprod__line1">{row.headline}</div>
                  <div className="lh-mh-fprod__line2">{row.subline}</div>
                  <div className="lh-mh-fprod__price">${p.price}</div>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      <section className="lh-mh-news" aria-labelledby="mh-news-title">
        <div className="lh-mh-news__inner">
          <h2 id="mh-news-title">Join the Lumina Herb ritual</h2>
          <p>Sign up for 10% off your first order</p>
          {signedUp ? (
            <p className="lh-mh-news__thanks">You&apos;re in — check your inbox soon.</p>
          ) : (
            <form className="lh-mh-news__form" onSubmit={onNewsletter}>
              <input
                className="lh-mh-news__input"
                type="email"
                required
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
              />
              <button type="submit" className="lh-mh-news__btn">
                Sign up
              </button>
            </form>
          )}
        </div>
      </section>
    </PageLayout>
  )
}
