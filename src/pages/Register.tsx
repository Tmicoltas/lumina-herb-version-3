import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function RegisterPage() {
  const { user, register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to="/home" replace />

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !email.trim()) {
      setError('Please fill in name and email.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setError('')
    register(name.trim(), email.trim(), password)
    navigate('/home', { replace: true })
  }

  return (
    <div className="lh-auth-split">
      <div className="lh-auth-panel lh-auth-panel--art lh-auth-panel--art-right" aria-hidden>
        <div className="lh-auth-art__block">
          <h2 className="lh-auth-art__title">Join the Ritual</h2>
          <p className="lh-auth-art__sub">Start your wellness journey today</p>
        </div>
      </div>
      <div className="lh-auth-panel lh-auth-panel--form">
        <div className="lh-auth-form__inner">
          <div className="lh-auth-form__brand lh-auth-form__brand--center">Lumina Herb</div>
          <p className="lh-auth-form__sub lh-auth-form__sub--center">
            Welcome back to wellness
          </p>
          <form onSubmit={onSubmit}>
            <div className="lh-field">
              <label htmlFor="reg-name">Name</label>
              <input
                id="reg-name"
                className="lh-input"
                autoComplete="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="lh-field">
              <label htmlFor="reg-email">Email</label>
              <input
                id="reg-email"
                className="lh-input"
                type="email"
                autoComplete="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="lh-field">
              <label htmlFor="reg-pass">Password</label>
              <input
                id="reg-pass"
                className="lh-input"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="lh-field">
              <label htmlFor="reg-pass2">Confirm Password</label>
              <input
                id="reg-pass2"
                className="lh-input"
                type="password"
                autoComplete="new-password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
            {error ? <p className="lh-error">{error}</p> : null}
            <button type="submit" className="lh-btn lh-btn--purple lh-btn--block">
              Create account
            </button>
          </form>
          <p className="lh-auth-switch lh-auth-switch--register">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}