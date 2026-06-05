import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function GoogleMark() {
  return (
    <svg className="lh-google-icon" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z"
      />
    </svg>
  )
}

export function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/home" replace />

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    setError('')
    login(email.trim(), password)
    navigate('/home', { replace: true })
  }

  return (
    <div className="lh-auth-split">
      <div className="lh-auth-panel lh-auth-panel--form">
        <div className="lh-auth-form__inner">
          <div className="lh-auth-form__brand">Lumina Herb</div>
          <p className="lh-auth-form__sub">Welcome back to wellness</p>
          <form onSubmit={onSubmit}>
            <div className="lh-field">
              <label htmlFor="login-email">Email</label>
              <input
                id="login-email"
                className="lh-input"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lh-field">
              <label htmlFor="login-pass">Password</label>
              <input
                id="login-pass"
                className="lh-input"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lh-auth-row">
              <a href="#forgot" className="lh-link-muted">
                Forgot password?
              </a>
            </div>
            {error ? <p className="lh-error">{error}</p> : null}
            <div className="lh-divider">Or continue with</div>
            <button type="submit" className="lh-btn lh-btn--purple lh-btn--block">
              Login
            </button>
            <button
              type="button"
              className="lh-btn lh-btn--google lh-btn--block"
              style={{ marginTop: 12 }}
            >
              <GoogleMark />
              Continue with Google
            </button>
          </form>
          <p className="lh-auth-switch lh-auth-switch--login">
            Don&apos;t have an account? <Link to="/register">Create account</Link>
          </p>
        </div>
      </div>
      <div className="lh-auth-panel lh-auth-panel--art" aria-hidden>
        <div className="lh-auth-art__block">
          <h2 className="lh-auth-art__title">Natural Balance</h2>
          <p className="lh-auth-art__sub">Through plant-based wellness</p>
        </div>
      </div>
    </div>
  )
}