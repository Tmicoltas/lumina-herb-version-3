export function friendlySupabaseError(error: unknown, fallback: string) {
    if (!error || typeof error !== 'object') return fallback
    const message = 'message' in error ? String(error.message) : ''
    if (!message) return fallback
  
    if (/invalid login credentials/i.test(message)) {
      return 'Invalid email or password.'
    }
    if (/user already registered|already been registered/i.test(message)) {
      return 'An account with this email already exists.'
    }
    if (/email not confirmed/i.test(message)) {
      return 'Please confirm your email before logging in.'
    }
    if (/row-level security|violates row-level security/i.test(message)) {
      return 'Supabase permissions blocked this action. Please review the RLS policies in the README.'
    }
  
    return message
  }
  