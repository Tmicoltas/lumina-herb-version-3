import { Link } from 'react-router-dom'

export type SiteFooterTone = 'light' | 'dark'

type SiteFooterProps = {
  tone: SiteFooterTone
  /** Marketing layout: brand + 4 link columns (Shop, Company, Support, Social) */
  layout?: 'default' | 'marketing'
}

const TAGLINE =
  'Holistic cannabis care for modern wellness. Discover plant-based self-care products.'

const ABOUT_SNIPPET =
  'A holistic approach to modern wellness. Discover our range of natural products crafted for balance, rest, and everyday radiance.'

export function SiteFooter({ tone, layout = 'default' }: SiteFooterProps) {
  if (layout === 'marketing' && tone === 'light') {
    return (
      <footer className={`lh-footer lh-footer--${tone} lh-footer--marketing`}>
        <div className="lh-footer__marketing">
          <div className="lh-footer__brand-block">
            <div className="lh-footer__brand">
              <span className="lh-footer__brand-strong">Lumina</span> Herb
            </div>
            <p className="lh-footer__desc">{ABOUT_SNIPPET}</p>
          </div>
          <div>
            <h3 className="lh-footer__heading">Shop</h3>
            <ul className="lh-footer__list">
              <li>
                <Link to="/shop">All products</Link>
              </li>
              <li>
                <Link to="/shop?category=Relax">Relax</Link>
              </li>
              <li>
                <Link to="/shop?category=Skin">Skin</Link>
              </li>
              <li>
                <Link to="/shop?category=Sleep">Sleep</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="lh-footer__heading">Company</h3>
            <ul className="lh-footer__list">
              <li>
                <Link to="/about">About us</Link>
              </li>
              <li>
                <Link to="/about">Our story</Link>
              </li>
              <li>
                <a href="#careers">Careers</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="lh-footer__heading">Support</h3>
            <ul className="lh-footer__list">
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#shipping">Shipping</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="lh-footer__heading">Social</h3>
            <ul className="lh-footer__list">
              <li>
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="lh-footer__rule" />
        <p className="lh-footer__copy">© 2024 Lumina Herb. All rights reserved.</p>
      </footer>
    )
  }

  return (
    <footer className={`lh-footer lh-footer--${tone}`}>
      <div className="lh-footer__grid">
        <div>
          <div className="lh-footer__brand">
            <span className="lh-footer__brand-strong">Lumina</span> Herb
          </div>
          <p className="lh-footer__desc">{TAGLINE}</p>
        </div>
        <div>
          <h3 className="lh-footer__heading">Quick Links</h3>
          <ul className="lh-footer__list">
            <li>
              <Link to="/shop">Shop</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="lh-footer__heading">Follow Us</h3>
          <ul className="lh-footer__list">
            <li>
              <a href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>
              <a href="https://twitter.com" target="_blank" rel="noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="lh-footer__rule" />
      <p className="lh-footer__copy">© 2026 Lumina Herb. All rights reserved.</p>
    </footer>
  )
}
