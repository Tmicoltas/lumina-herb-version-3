import { PageLayout } from '../components/PageLayout'

export function AboutPage() {
  return (
    <PageLayout headerTone="light" footerTone="light" mainClassName="lh-main--light">
      <article className="lh-static">
        <h1>About Lumina Herb</h1>
        <p>
          Lumina Herb is dedicated to holistic cannabis care for modern wellness. Our small-batch
          formulas combine thoughtfully sourced botanicals with transparent labeling so you can
          build rituals that fit real life.
        </p>
        <p>
          From calming oils to night serums and ritual kits, each product is crafted to support
          balance, rest, and everyday radiance.
        </p>
      </article>
    </PageLayout>
  )
}