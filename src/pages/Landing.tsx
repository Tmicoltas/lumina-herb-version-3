import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div className="lh-splash">
      <div className="lh-splash__main">
        <h1 className="lh-splash__title">Lumina Herb</h1>
        <p className="lh-splash__tag">
          Holistic cannabis care for modern wellness
        </p>
      </div>
      <footer className="lh-splash__enter" aria-label="Get started">
        <nav className="lh-splash__links">
          <Link to="/login">Sign in</Link>
          <span className="lh-splash__sep" aria-hidden>
            ·
          </span>
          <Link to="/register">Create account</Link>
        </nav>
      </footer>
    </div>
  )
}
