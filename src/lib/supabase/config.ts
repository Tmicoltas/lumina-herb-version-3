const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

function normalizeSupabaseUrl(url: string) {
  return url.trim().replace(/\/rest\/v1\/?$/, '').replace(/\/$/, '')
}

export const supabaseUrl = rawSupabaseUrl
  ? normalizeSupabaseUrl(rawSupabaseUrl)
  : ''

export { supabaseAnonKey }

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

