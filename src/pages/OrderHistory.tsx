import { Link } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import { useOrders } from '../context/OrderContext'

export function OrderHistoryPage() {
  const { orders } = useOrders()

  return (
    <PageLayout headerTone="light" footerTone="light" mainClassName="lh-main--light">
      <div className="lh-oh-head">
        <div>
          <h1>Order History</h1>
          <p>Track and manage your wellness orders.</p>
        </div>
        <Link to="/profile">
          <button type="button" className="lh-btn-outline-light">
            Back to Profile
          </button>
        </Link>
      </div>

      {orders.length === 0 ? (
        <p style={{ maxWidth: 960, margin: '0 auto', color: '#525252' }}>No orders yet.</p>
      ) : (
        orders.map((o) => {
          const names = o.items.map((i) => i.product.name).join(', ')
          const date = new Date(o.createdAt).toLocaleDateString(undefined, {
            dateStyle: 'long',
          })
          const badge =
            o.status === 'delivered' ? (
              <span className="lh-badge-status lh-badge-status--done">Delivered</span>
            ) : (
              <span className="lh-badge-status lh-badge-status--proc">Processing</span>
            )
          return (
            <div key={o.id} className="lh-order-card">
              <div className="lh-order-card__icon">📦</div>
              <div>
                <div>
                  <strong>Order {o.id}</strong>
                  {badge}
                </div>
                <div className="lh-order-card__meta" style={{ marginTop: 6 }}>
                  {names}
                </div>
                <div className="lh-order-card__meta" style={{ marginTop: 4 }}>
                  {date}
                </div>
              </div>
              <div className="lh-order-card__price">
                ${o.totalAmount.toFixed(2)}
                <span style={{ marginLeft: 6, opacity: 0.5 }}>⌄</span>
              </div>
            </div>
          )
        })
      )}
    </PageLayout>
  )
}