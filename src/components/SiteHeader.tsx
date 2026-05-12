import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const NAV = [
  { to: '/shop', label: 'Shop' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export type SiteHeaderTone = 'lime' | 'dark' | 'light'

type SiteHeaderProps = {
  tone: SiteHeaderTone
}

export function SiteHeader({ tone }: SiteHeaderProps) {
  const { totalPieces } = useCart()

  return (
    <header className={`lh-topnav lh-topnav--${tone}`}>
      <div className="lh-topnav__inner">
        <Link to="/home" className="lh-topnav__logo">
          <span className="lh-topnav__logo-strong">Lumina</span> Herb
        </Link>

        <nav className="lh-topnav__links" aria-label="Primary">
          {NAV.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `lh-topnav__link${isActive ? ' lh-topnav__link--active' : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="lh-topnav__actions">
          <Link to="/profile" className="lh-topnav__icon" aria-label="Account">
            <IconUser />
          </Link>
          <Link
            to="/cart"
            className="lh-topnav__icon"
            aria-label={`Shopping cart, ${totalPieces} items`}
          >
            <IconCart />
            {totalPieces > 0 ? (
              <span className="lh-topnav__badge">{totalPieces}</span>
            ) : null}
          </Link>
        </div>
      </div>
    </header>
  )
}

function IconCart() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 21a8 8 0 0116 0"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
