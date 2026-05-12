/** Marketing home — image URLs (swap for CDN when ready). */
export const HOME_IMAGES = {
  hero:
    'https://res.cloudinary.com/dsybz6dpt/image/upload/v1776133537/image_2-2_yxrxvc.png',
  ritual:
    'https://res.cloudinary.com/dpymsjjnk/image/upload/v1778618063/image_3_kchfsy.png',
} as const

export type HomeFeaturedItem = {
  productId: string
  /** Bold line (e.g. goal vibe) */
  headline: string
  /** Sub line (product type) */
  subline: string
}

/** Order matches 2×2 featured grid in mockup */
export const HOME_FEATURED: HomeFeaturedItem[] = [
  { productId: 'lh-cbd-calm', headline: 'Relax', subline: 'CBD oil' },
  { productId: 'lh-night-serum', headline: 'Sleep', subline: 'Night serum' },
  { productId: 'lh-glow-cream', headline: 'Skin', subline: 'Face cream' },
  { productId: 'lh-hair-kit', headline: 'Ritual', subline: 'Hair kit' },
]

export const HOME_WELLNESS_GOALS: {
  slug: string
  label: string
  icon: string
  tint: 'green' | 'peach' | 'blue' | 'pink'
}[] = [
  { slug: 'Relax', label: 'Relax', icon: '🌿', tint: 'green' },
  { slug: 'Skin', label: 'Skin', icon: '✨', tint: 'peach' },
  { slug: 'Sleep', label: 'Sleep', icon: '🌙', tint: 'blue' },
  { slug: 'Mood', label: 'Mood', icon: '◇', tint: 'pink' },
]
