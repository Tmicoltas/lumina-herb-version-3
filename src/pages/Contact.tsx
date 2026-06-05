import { useState, type FormEvent } from 'react'
import { PageLayout } from '../components/PageLayout'

export function ContactPage() {
  const [sent, setSent] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <PageLayout headerTone="light" footerTone="light" mainClassName="lh-main--light">
      <article className="lh-static">
        <h1>Contact</h1>
        <p>
          Questions about an order, ingredients, or finding Lumina Herb near you? Send us a note —
          our wellness team replies within two business days.
        </p>
        {sent ? (
          <p style={{ fontWeight: 600, color: 'var(--lh-green-soft)' }}>
            Thanks! Your message is on its way.
          </p>
        ) : (
          <form onSubmit={onSubmit} style={{ marginTop: 24 }}>
            <div className="lh-field">
              <label htmlFor="ct-name">Name</label>
              <input id="ct-name" className="lh-input" required />
            </div>
            <div className="lh-field">
              <label htmlFor="ct-email">Email</label>
              <input id="ct-email" className="lh-input" type="email" required />
            </div>
            <div className="lh-field">
              <label htmlFor="ct-msg">Message</label>
              <textarea
                id="ct-msg"
                className="lh-input"
                rows={4}
                required
                style={{ borderRadius: 16, resize: 'vertical' }}
              />
            </div>
            <button type="submit" className="lh-btn lh-btn--purple lh-btn--block">
              Send message
            </button>
          </form>
        )}
      </article>
    </PageLayout>
  )
}