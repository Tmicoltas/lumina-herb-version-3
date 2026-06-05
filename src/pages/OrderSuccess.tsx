import { Link, Navigate, useLocation } from 'react-router-dom'
import { PageLayout } from '../components/PageLayout'
import type { Order } from '../types'

export function OrderSuccessPage() {

  // Obtiene la orden enviada desde la página de checkout
  const { state } = useLocation()
  const order = (state as { order?: Order } | null)?.order

  // Redirige al inicio si no existe una orden válida
  if (!order) return <Navigate to="/home" replace />

  // Convierte las fechas para mostrarlas en un formato legible
  const created = new Date(order.createdAt)
  const eta = new Date(order.estimatedDelivery)

  return (
    <PageLayout headerTone="dark" footerTone="dark" mainClassName="lh-main--dark">
      <div className="lh-success">

        {/* Mensaje de confirmación de compra */}
        <div className="lh-success__icon">✓</div>
        <h1 style={{ margin: '0 0 8px', fontSize: '1.75rem' }}>Your order is on the way!</h1>
        <p style={{ margin: '0 0 28px', color: 'var(--lh-muted)' }}>
          Thank you for choosing Lumina Herb
        </p>

        {/* Resumen de la orden realizada */}
        <div className="lh-success__card">
          <h3>Order Details</h3>
          <div className="lh-success-row">
            <span>Order Number</span>
            <strong>{order.id}</strong>
          </div>
          <div className="lh-success-row">
            <span>Order Date</span>
            <span>{created.toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          </div>
          <div className="lh-success-row">
            <span>Estimated Delivery</span>
            <span>{eta.toLocaleDateString(undefined, { dateStyle: 'long' })}</span>
          </div>
          <div className="lh-success-row">
            <span>Total Amount</span>
            <strong>${order.totalAmount.toFixed(2)}</strong>
          </div>
        </div>

        {/* Línea de tiempo del estado actual del pedido */}
        <div className="lh-timeline">
          <div className="lh-tl-item">
            <div
              className="lh-tl-dot"
              style={{ background: 'var(--lh-green)', color: '#fff' }}
            >
              ✓
            </div>
            <div>
              <strong>Confirmed</strong>
              <div style={{ fontSize: '0.88rem', color: 'var(--lh-muted)' }}>
                Your order has been received and confirmed
              </div>
            </div>
          </div>

          <div className="lh-tl-item">
            <div
              className="lh-tl-dot"
              style={{ background: 'var(--lh-purple)', color: '#fff' }}
            >
            </div>
            <div>
              <strong>Preparing</strong>
              <div style={{ fontSize: '0.88rem', color: 'var(--lh-muted)' }}>
                We&apos;re preparing your wellness essentials
              </div>
            </div>
          </div>

          <div className="lh-tl-item">
            <div
              className="lh-tl-dot"
              style={{ background: '#fff', color: '#1a1a1a' }}
            />
            <div>
              <strong>On the way</strong>
              <div style={{ fontSize: '0.88rem', color: 'var(--lh-muted)' }}>
                Your order will be shipped soon
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '0.88rem', color: 'var(--lh-muted)', marginBottom: 20 }}>
          A confirmation email has been sent to your inbox.
          <br />
          You can track your order status from your profile.
        </p>

        {/* Opciones de navegación después de completar la compra */}
        <div className="lh-success-actions">
          <Link to="/orders" className="lh-btn lh-btn--purple lh-btn--block">
            View Order History
          </Link>
          <Link to="/home" className="lh-btn lh-btn--outline-dark lh-btn--block">
            Return to Home
          </Link>
        </div>

      </div>
    </PageLayout>
  )
}