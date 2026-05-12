import type { ReactNode } from 'react'
import { SiteFooter, type SiteFooterTone } from './SiteFooter'
import { SiteHeader, type SiteHeaderTone } from './SiteHeader'

type PageLayoutProps = {
  children: ReactNode
  headerTone?: SiteHeaderTone
  footerTone: SiteFooterTone
  footerLayout?: 'default' | 'marketing'
  /** Main area background */
  mainClassName?: string
  /** Optional row under header (e.g. back link) */
  subHeader?: ReactNode
  showFooter?: boolean
  /** Shop page renders its own header inside lime hero */
  hideHeader?: boolean
}

export function PageLayout({
  children,
  headerTone = 'dark',
  footerTone,
  footerLayout = 'default',
  mainClassName = '',
  subHeader,
  showFooter = true,
  hideHeader = false,
}: PageLayoutProps) {
  return (
    <div className="lh-page">
      {!hideHeader ? <SiteHeader tone={headerTone} /> : null}
      {subHeader ? <div className="lh-subheader">{subHeader}</div> : null}
      <main className={`lh-page__main ${mainClassName}`.trim()}>{children}</main>
      {showFooter ? (
        <SiteFooter tone={footerTone} layout={footerLayout} />
      ) : null}
    </div>
  )
}
