export const HOME_IMAGES = {
  hero:
    'https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=85',
  ritual:
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=85',
} as const

export type HomeFeaturedItem = {
  productId: string
 
  headline: string

  subline: string
}


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