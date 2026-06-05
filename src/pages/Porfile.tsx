import { useState, type FormEvent } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout, updateProfile } = useAuth()
  const { orders, loading, error } = useOrders()
  const recent = orders.slice(0, 2)
  const [editingInfo, setEditingInfo] = useState(false)
  const [editingAddress, setEditingAddress] = useState(false)
  const [savingInfo, setSavingInfo] = useState(false)
  const [savingAddress, setSavingAddress] = useState(false)
  const [profileMessage, setProfileMessage] = useState('')
  const [profileError, setProfileError] = useState('')
  const [addressMessage, setAddressMessage] = useState('')
  const [addressError, setAddressError] = useState('')
  const [form, setForm] = useState({
    fullName: user?.displayName ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
  })

  function patch<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function saveProfile(e: FormEvent) {
    e.preventDefault()
    setProfileError('')
    setProfileMessage('')
    setSavingInfo(true)
    try {
      await updateProfile(form)
      setEditingInfo(false)
      setProfileMessage('Profile updated successfully.')
    } catch (err) {
      setProfileError(err instanceof Error ? err.message : 'Could not update your profile.')
    } finally {
      setSavingInfo(false)
    }
  }

  async function saveAddress(e: FormEvent) {
    e.preventDefault()
    setAddressError('')
    setAddressMessage('')
    setSavingAddress(true)
    try {
      await updateProfile(form)
      setEditingAddress(false)
      setAddressMessage('Shipping address saved.')
    } catch (err) {
      setAddressError(err instanceof Error ? err.message : 'Could not save your address.')
    } finally {
      setSavingAddress(false)
    }
  }

  return (
    <PageLayout headerTone="light" footerTone="light" mainClassName="lh-main--light">
      <div
        style={{
          maxWidth: 1040,
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          marginBottom: 24,
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.75rem' }}>My Profile</h1>
        <button
          type="button"
          className="lh-btn-outline-light"
          onClick={() => {
            void logout().finally(() => {
              navigate('/login', { replace: true })
            })
          }}
        >
          Logout
        </button>
      </div>

      <div className="lh-profile-wrap">
        <aside className="lh-profile-nav">
          <NavLink
            to="/profile"
            end
            className={({ isActive }) =>
              `lh-profile-nav-item${isActive ? ' lh-profile-nav--active' : ''}`
            }
          >
            👤 Account Info
          </NavLink>
          <NavLink
            to="/orders"
            className={({ isActive }) =>
              `lh-profile-nav-item${isActive ? ' lh-profile-nav--active' : ''}`
            }
          >
            🕐 Order History
          </NavLink>
          <span className="lh-profile-nav-item" style={{ opacity: 0.45 }}>
            📍 Addresses
          </span>
          <span className="lh-profile-nav-item" style={{ opacity: 0.45 }}>
            ⚙️ Settings
          </span>
        </aside>

        <div className="lh-profile-main">
          <section className="lh-pcard-white">
            <div className="lh-pcard-white__head">
              <h2>Personal Information</h2>
              <button
                type="button"
                className="lh-link-button"
                onClick={() => {
                  setEditingInfo((current) => !current)
                  setProfileError('')
                  setProfileMessage('')
                }}
              >
                {editingInfo ? 'Cancel' : 'Edit'}
              </button>
            </div>
            {editingInfo ? (
              <form onSubmit={saveProfile}>
                <div className="lh-field-light">
                  <label htmlFor="profile-name">Full Name</label>
                  <input
                    id="profile-name"
                    className="lh-input-light"
                    value={form.fullName}
                    onChange={(e) => patch('fullName', e.target.value)}
                    required
                  />
                </div>
                <div className="lh-field-light">
                  <label htmlFor="profile-email">Email Address</label>
                  <input
                    id="profile-email"
                    className="lh-input-light"
                    type="email"
                    value={form.email}
                    onChange={(e) => patch('email', e.target.value)}
                    required
                  />
                </div>
                <div className="lh-field-light">
                  <label htmlFor="profile-phone">Phone Number</label>
                  <input
                    id="profile-phone"
                    className="lh-input-light"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => patch('phone', e.target.value)}
                  />
                </div>
                {profileError ? <p className="lh-error">{profileError}</p> : null}
                {profileMessage ? <p className="lh-success-text">{profileMessage}</p> : null}
                <button type="submit" className="lh-btn lh-btn--purple" disabled={savingInfo}>
                  {savingInfo ? 'Saving...' : 'Save profile'}
                </button>
              </form>
            ) : (
              <>
                <div className="lh-kv">
                  <span>Full Name</span>
                  <span>{user?.displayName}</span>
                </div>
                <div className="lh-kv">
                  <span>Email Address</span>
                  <span>{user?.email}</span>
                </div>
                <div className="lh-kv">
                  <span>Phone Number</span>
                  <span>{user?.phone || 'No phone saved'}</span>
                </div>
                {profileMessage ? <p className="lh-success-text">{profileMessage}</p> : null}
              </>
            )}
          </section>

          <section className="lh-pcard-white">
            <div className="lh-pcard-white__head">
              <h2>Default Shipping Address</h2>
              <button
                type="button"
                className="lh-link-button"
                onClick={() => {
                  setEditingAddress((current) => !current)
                  setAddressError('')
                  setAddressMessage('')
                }}
              >
                {editingAddress ? 'Cancel' : user?.address ? 'Edit' : 'Add'}
              </button>
            </div>
            {editingAddress ? (
              <form onSubmit={saveAddress}>
                <div className="lh-field-light">
                  <label htmlFor="profile-address">Shipping Address</label>
                  <textarea
                    id="profile-address"
                    className="lh-input-light lh-textarea-light"
                    value={form.address}
                    onChange={(e) => patch('address', e.target.value)}
                    placeholder="Add your shipping address"
                    required
                  />
                </div>
                {addressError ? <p className="lh-error">{addressError}</p> : null}
                {addressMessage ? <p className="lh-success-text">{addressMessage}</p> : null}
                <button type="submit" className="lh-btn lh-btn--purple" disabled={savingAddress}>
                  {savingAddress ? 'Saving...' : 'Save address'}
                </button>
              </form>
            ) : (
              <>
                <div
                  style={{
                    background: '#f5f3ff',
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                  }}
                >
                  <span style={{ color: 'var(--lh-purple)' }}>📍</span>
                  <span style={{ fontWeight: 600 }}>
                    {user?.address || 'No shipping address saved yet.'}
                  </span>
                </div>
                <button
                  type="button"
                  className="lh-link-button"
                  style={{ marginTop: 12 }}
                  onClick={() => {
                    setEditingAddress(true)
                    setAddressError('')
                    setAddressMessage('')
                  }}
                >
                  {user?.address ? 'Edit address' : '+ Add new address'}
                </button>
                {addressMessage ? <p className="lh-success-text">{addressMessage}</p> : null}
              </>
            )}
          </section>

          <section className="lh-pcard-white">
            <div className="lh-pcard-white__head">
              <h2>Recent Orders</h2>
              <Link to="/orders">View all</Link>
            </div>
            {error ? (
              <p style={{ color: '#b45309', margin: 0 }}>{error}</p>
            ) : loading ? (
              <p style={{ color: '#737373', margin: 0 }}>Loading orders...</p>
            ) : recent.length === 0 ? (
              <p style={{ color: '#737373', margin: 0 }}>No orders yet.</p>
            ) : (
              recent.map((o) => (
                <div
                  key={o.id}
                  style={{
                    background: '#f5f5f5',
                    borderRadius: 12,
                    padding: 14,
                    marginBottom: 10,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                    <strong>Order #{o.id}</strong>
                    <span
                      className={
                        o.status === 'delivered'
                          ? 'lh-badge-status lh-badge-status--done'
                          : 'lh-badge-status lh-badge-status--proc'
                      }
                    >
                      {o.status === 'delivered' ? 'Delivered' : 'Processing'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#525252', marginTop: 6 }}>
                    {o.items.map((i) => i.product.name).join(', ')}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#737373', marginTop: 4 }}>
                    {new Date(o.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                  <div style={{ fontWeight: 800, marginTop: 8 }}>${o.totalAmount.toFixed(2)}</div>
                </div>
              ))
            )}
          </section>

          <div className="lh-help-banner">
            <p>
              Need help? Our wellness team is here to assist you with any questions about your
              account or products.
            </p>
            <Link to="/contact" className="lh-btn lh-btn--purple">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

