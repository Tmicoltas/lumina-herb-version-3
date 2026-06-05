import type { Product, ShopCategory } from '../types'

export const PLACEHOLDER_IMAGES = {
  mockupDir: '/mockups',
} as const

export const PRODUCTS: Product[] = [
  {
    id: 'lh-cbd-calm',
    name: 'CBD Calm Oil',
    price: 49,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1776134006/image_4_rwferg.png',
    shopCategory: 'Relax',
    badge: 'New',
    description:
      'A soothing full-spectrum CBD oil crafted to ease tension and support calm focus during your day.',
    benefits: [
      'Supports a balanced mood',
      'Helps unwind after long days',
      'Fast-absorbing, non-greasy feel',
      'Third-party tested for purity',
    ],
    ingredients: [
      'Organic CBD extract',
      'MCT coconut oil',
      'Natural terpenes',
      'Lavender essential oil',
    ],
    howToUse:
      'Place half to one full dropper under the tongue, hold 30–60 seconds, then swallow. Use morning or evening as needed.',
    wellnessTags: ['Stress Relief', 'Daily Wellness'],
    relatedIds: ['lh-night-serum', 'lh-energy-balm'],
  },

  {
    id: 'lh-night-serum',
    name: 'Night Ritual Serum',
    price: 55,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1776134006/image_5_h9mgqf.png',
    shopCategory: 'Sleep',
    description:
      'Silky night serum with botanicals to hydrate skin and prepare your senses for deep rest.',
    benefits: [
      'Overnight hydration',
      'Calming botanical aroma',
      'Supports skin barrier',
      'Dermatologist-friendly formula',
    ],
    ingredients: ['CBD isolate', 'Hyaluronic acid', 'Chamomile', 'Squalane'],
    howToUse:
      'Apply 3–4 drops to clean skin before bed. Massage gently upward and outward.',
    wellnessTags: ['Better Sleep', 'Radiant Skin'],
    relatedIds: ['lh-cbd-calm', 'lh-glow-cream'],
  },

  {
    id: 'lh-glow-cream',
    name: 'Glow Face Cream',
    price: 38,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1778614928/image_6_fqm43y.png',
    shopCategory: 'Skin',
    description:
      'Lightweight daily cream for luminous, even-looking skin with plant-based antioxidants.',
    benefits: [
      'Brightens dull skin',
      'Locks in moisture',
      'Smooths fine texture',
      'Layer-friendly under SPF',
    ],
    ingredients: ['Hemp seed oil', 'Niacinamide', 'Vitamin E', 'Aloe vera'],
    howToUse:
      'Smooth a pea-sized amount over face and neck after serum, AM and/or PM.',
    wellnessTags: ['Radiant Skin', 'Daily Wellness'],
    relatedIds: ['lh-cbd-calm', 'lh-morning-oil'],
  },

  {
    id: 'lh-energy-balm',
    name: 'Energy Balance Balm',
    price: 42,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1776134006/image_7_civlvz.png',
    shopCategory: 'Mood',
    description:
      'A portable balm with uplifting notes to roll onto pulse points whenever you need a gentle reset.',
    benefits: [
      'Portable ritual',
      'Cooling on contact',
      'Subtle aromatherapy',
      'Clean, travel-ready tin',
    ],
    ingredients: [
      'CBD broad spectrum',
      'Shea butter',
      'Peppermint',
      'Citrus oils',
    ],
    howToUse:
      'Glide onto wrists, temples, or neck. Reapply up to 3 times daily.',
    wellnessTags: ['Energy Boost', 'Stress Relief'],
    relatedIds: ['lh-cbd-calm', 'lh-zen-body'],
  },

  {
    id: 'lh-morning-oil',
    name: 'Morning Ritual Oil',
    price: 47,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1776134006/image_8_a1cwas.png',
    shopCategory: 'Rituals',
    description:
      'Brightening body oil to start the day — lightweight sheen and a crisp herbal finish.',
    benefits: [
      'Fast-absorbing oils',
      'Subtle glow on limbs',
      'Pairs with gua sha',
      'Clean scent profile',
    ],
    ingredients: [
      'Jojoba oil',
      'CBD extract',
      'Grapefruit peel',
      'Vitamin E',
    ],
    howToUse:
      'Massage into damp skin after shower from shoulders to toes.',
    wellnessTags: ['Daily Wellness', 'Energy Boost'],
    relatedIds: ['lh-glow-cream', 'lh-zen-body'],
  },

  {
    id: 'lh-zen-body',
    name: 'Zen Garden Body Oil',
    price: 52,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1778614755/image_9_iztngr.png',
    shopCategory: 'Relax',
    description:
      'Rich botanical body oil inspired by slow evenings and quiet gardens.',
    benefits: [
      'Deep moisture for dry skin',
      'Grounding herbal scent',
      'Silicone-free glide',
      'Pairs with bath ritual',
    ],
    ingredients: [
      'Sweet almond oil',
      'CBD isolate',
      'Cedarwood',
      'Rosehip',
    ],
    howToUse:
      'Warm a few pumps between palms and press into skin after bathing.',
    wellnessTags: ['Stress Relief', 'Better Sleep'],
    relatedIds: ['lh-cbd-calm', 'lh-zen-candle'],
  },

  {
    id: 'lh-zen-candle',
    name: 'Zen Garden Candle',
    price: 28,
    image: 'https://res.cloudinary.com/dpymsjjnk/image/upload/v1778619612/image_10_fcmp9r.png',
    shopCategory: 'Rituals',
    description:
      'Hand-poured soy candle with hemp and herbal notes for mindful spaces.',
    benefits: [
      '40+ hour burn',
      'Cotton wick',
      'Low soot formulation',
      'Sets a calming mood',
    ],
    ingredients: ['Soy wax', 'Essential oil blend', 'Hemp terpenes'],
    howToUse:
      'Trim wick to ¼ inch before each lighting. Burn within sight on a heat-safe surface.',
    wellnessTags: ['Better Sleep', 'Stress Relief'],
    relatedIds: ['lh-zen-body', 'lh-night-serum'],
  },

  {
    id: 'lh-hair-kit',
    name: 'Hair Ritual Kit',
    price: 75,
    image: 'https://res.cloudinary.com/dhan9gfxc/image/upload/v1778614954/image_11_qg5fto.png',
    shopCategory: 'Rituals',
    description:
      'Curated trio for scalp massage, strand strength, and weekly deep care.',
    benefits: [
      'Complete ritual in one box',
      'Scalp-focused treatment',
      'Shine without weight',
      'Gift-ready packaging',
    ],
    ingredients: [
      'CBD oil',
      'Argan oil',
      'Biotin complex',
      'Tea tree',
    ],
    howToUse:
      'Follow numbered steps inside the box — start with scalp oil, then cleanse, then mask.',
    wellnessTags: ['Radiant Skin', 'Daily Wellness'],
    relatedIds: ['lh-morning-oil', 'lh-glow-cream'],
  },
]

export const SHOP_CATEGORIES: readonly (ShopCategory | 'All')[] = [
  'All',
  'Relax',
  'Sleep',
  'Skin',
  'Mood',
  'Rituals',
]

export const PRICE_FILTERS = [
  'All',
  'Under $50',
  '$50 - $70',
  'Over $70',
] as const

export const WELLNESS_GOALS = [
  'Stress Relief',
  'Better Sleep',
  'Radiant Skin',
  'Energy Boost',
  'Daily Wellness',
] as const

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id)
}

export function getRelatedProducts(product: Product): Product[] {
  return product.relatedIds
    .map((rid) => getProductById(rid))
    .filter((p): p is Product => Boolean(p))
}