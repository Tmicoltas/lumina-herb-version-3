import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { SiteHeader } from '../components/SiteHeader'
import {
  PRICE_FILTERS,
  PRODUCTS,
  SHOP_CATEGORIES,
  WELLNESS_GOALS,
} from '../data/products'
import type { Product, ShopCategory } from '../types'

function matchesCategory(p: Product, cat: ShopCategory | 'All') {
  if (cat === 'All') return true
  return p.shopCategory === cat
}

function matchesPrice(
  p: Product,
  tier: (typeof PRICE_FILTERS)[number],
) {
  if (tier === 'All') return true
  if (tier === 'Under $50') return p.price < 50
  if (tier === '$50 - $70') return p.price >= 50 && p.price <= 70
  return p.price > 70
}

function matchesWellness(p: Product, selected: Set<string>) {
  if (selected.size === 0) return true
  return p.wellnessTags.some((t: string) => selected.has(t))
}

const VALID_SHOP_CATEGORIES: ShopCategory[] = [
  'Relax',
  'Sleep',
  'Skin',
  'Mood',
  'Rituals',
]

function categoryFromSearch(raw: string | null): ShopCategory | 'All' {
  if (!raw) return 'All'
  const decoded = decodeURIComponent(raw)
  return VALID_SHOP_CATEGORIES.includes(decoded as ShopCategory)
    ? (decoded as ShopCategory)
    : 'All'
}

export function ShopCollectionPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const cat = useMemo(
    () => categoryFromSearch(searchParams.get('category')),
    [searchParams],
  )
  const [priceTier, setPriceTier] = useState<(typeof PRICE_FILTERS)[number]>('All')
  const [wellness, setWellness] = useState<Set<string>>(() => new Set())
  const [filtersOpen, setFiltersOpen] = useState(false)

  function setCategory(next: ShopCategory | 'All') {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        if (next === 'All') p.delete('category')
        else p.set('category', next)
        return p
      },
      { replace: true },
    )
  }

  const filtered = useMemo(() => {
    return PRODUCTS.filter(
      (p) =>
        matchesCategory(p, cat) &&
        matchesPrice(p, priceTier) &&
        matchesWellness(p, wellness),
    )
  }, [cat, priceTier, wellness])

  function toggleGoal(g: string) {
    setWellness((prev) => {
      const next = new Set(prev)
      if (next.has(g)) next.delete(g)
      else next.add(g)
      return next
    })
  }

  const filterPanel = (
    <aside
      className={`lh-filters${filtersOpen ? ' lh-filters--open' : ''}`}
    >
      <h2>Filters</h2>
      <h3>Category</h3>
      <div className="lh-filter-pills">
        {SHOP_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={c === cat ? 'lh-pill lh-pill--on' : 'lh-pill'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <h3>Price range</h3>
      <div className="lh-filter-pills">
        {PRICE_FILTERS.map((t) => (
          <button
            key={t}
            type="button"
            className={t === priceTier ? 'lh-pill lh-pill--on' : 'lh-pill'}
            onClick={() => setPriceTier(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <h3>Wellness goal</h3>
      <div className="lh-checks">
        {WELLNESS_GOALS.map((g) => (
          <label key={g} className="lh-check">
            <input
              type="checkbox"
              checked={wellness.has(g)}
              onChange={() => toggleGoal(g)}
            />
            {g}
          </label>
        ))}
      </div>
    </aside>
  )

  return (
    <PageLayout hideHeader footerTone="light" mainClassName="">
      <div className="lh-shop-lime">
        <SiteHeader tone="lime" />
        <div className="lh-shop-hero">
          <h1>Shop Collection</h1>
          <p>Explore our complete range of wellness products</p>
        </div>
      </div>

      <div className="lh-shop-body">
        <div className="lh-shop-layout">
          <div>
            <div className="lh-filters-mobile-toggle">
              <button
                type="button"
                className="lh-btn lh-btn--purple"
                onClick={() => setFiltersOpen((o) => !o)}
              >
                {filtersOpen ? 'Hide filters' : 'Filters'}
              </button>
            </div>
            {filterPanel}
          </div>
          <div className="lh-product-grid">
            {filtered.map((p) => (
              <Link key={p.id} to={`/shop/${p.id}`} className="lh-pcard">
                <span className="lh-pcard__blob" aria-hidden />
                <img src={p.image} alt="" className="lh-pcard__img" />
                <div className="lh-pcard__overlay">
                  <div className="lh-pcard__brand">Lumina Herb</div>
                  <div className="lh-pcard__tag">
                    Holistic cannabis care for modern wellness
                  </div>
                  <div className="lh-pcard__name">{p.name}</div>
                  <div className="lh-pcard__price">${p.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <button type="button" className="lh-chat-fab" aria-label="Open chat">
        💬 Chat
      </button>
    </PageLayout>
  )
}