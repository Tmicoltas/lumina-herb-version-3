import { Link, NavLink, useNavigate } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { useAuth } from '../context/AuthContext'
import { useOrders } from '../context/OrderContext'

export function ProfilePage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { orders } = useOrders()
  const recent = orders.slice(0, 2)

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
            logout()
            navigate('/login', { replace: true })
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
              <a href="#edit">Edit</a>
            </div>
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
              <span>{user?.phone ?? '(555) 123-4567'}</span>
            </div>
          </section>

          <section className="lh-pcard-white">
            <div className="lh-pcard-white__head">
              <h2>Default Shipping Address</h2>
              <a href="#edit-addr">Edit</a>
            </div>
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
                123 Wellness Ave, San Francisco, CA 94102
              </span>
            </div>
            <a href="#add" style={{ display: 'inline-block', marginTop: 12, color: 'var(--lh-purple)', fontWeight: 600 }}>
              + Add new address
            </a>
          </section>

          <section className="lh-pcard-white">
            <div className="lh-pcard-white__head">
              <h2>Recent Orders</h2>
              <Link to="/orders">View all</Link>
            </div>
            {recent.length === 0 ? (
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
