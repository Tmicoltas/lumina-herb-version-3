import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase/client'
import { friendlySupabaseError } from '../lib/supabase/errors'

export type User = {
  id: string
  email: string
  displayName: string
  phone?: string
  address?: string
}

type AuthContextValue = {
  user: User | null
  session: Session | null
  loading: boolean
  refreshUser: () => Promise<void>
  updateProfile: (profile: ProfileUpdateInput) => Promise<void>
  login: (email: string, password: string) => Promise<void>
  register: (
    displayName: string,
    email: string,
    password: string,
    phone?: string,
  ) => Promise<void>
  logout: () => Promise<void>
}

export type ProfileUpdateInput = {
  fullName: string
  email: string
  phone?: string
  address?: string
}

const AuthContext = createContext<AuthContextValue | null>(null)

function nameFromEmail(email: string) {
  return email.split('@')[0] || 'Guest'
}

async function loadProfile(session: Session | null): Promise<User | null> {
  const authUser = session?.user
  if (!authUser?.email) return null

  const metadata = authUser.user_metadata as {
    full_name?: string
    displayName?: string
    phone?: string
    address?: string
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, phone, address')
    .eq('id', authUser.id)
    .maybeSingle()

  if (error) {
    throw new Error(
      friendlySupabaseError(error, 'Could not load your profile.'),
    )
  }

  return {
    id: authUser.id,
    email: data?.email || authUser.email,
    displayName:
      data?.full_name ||
      metadata.full_name ||
      metadata.displayName ||
      nameFromEmail(authUser.email),
    ...(data?.phone || metadata.phone
      ? { phone: data?.phone || metadata.phone }
      : {}),
    ...(data?.address || metadata.address
      ? { address: data?.address || metadata.address }
      : {}),
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const loadCurrentUser = useCallback(async (nextSession: Session | null) => {
    setSession(nextSession)
    if (!nextSession) {
      setUser(null)
      return
    }
    setUser(await loadProfile(nextSession))
  }, [])

  const refreshUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getSession()
    if (error) {
      throw new Error(friendlySupabaseError(error, 'Could not refresh your profile.'))
    }
    await loadCurrentUser(data.session)
  }, [loadCurrentUser])

  useEffect(() => {
    let active = true

    supabase.auth
      .getSession()
      .then(async ({ data, error }) => {
        if (error) throw error
        if (!active) return
        await loadCurrentUser(data.session)
      })
      .catch((error) => {
        console.error('Supabase session error:', error)
        if (active) {
          setSession(null)
          setUser(null)
        }
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void loadCurrentUser(nextSession).catch((error) => {
        console.error('Supabase auth state error:', error)
        setUser(null)
      })
    })

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [loadCurrentUser])

  const login = useCallback(
    async (email: string, password: string) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        throw new Error(friendlySupabaseError(error, 'Login failed.'))
      }
      await loadCurrentUser(data.session)
    },
    [loadCurrentUser],
  )

  const register = useCallback(
    async (
      displayName: string,
      email: string,
      password: string,
      phone?: string,
    ) => {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: displayName,
            phone: phone?.trim() || null,
            address: null,
          },
        },
      })

      if (error) {
        throw new Error(friendlySupabaseError(error, 'Registration failed.'))
      }
      if (!data.user) {
        throw new Error('Registration failed. Please try again.')
      }

      const { error: profileError } = await supabase.from('profiles').upsert({
        id: data.user.id,
        full_name: displayName,
        email,
        phone: phone?.trim() || null,
        address: null,
      })

      if (profileError) {
        throw new Error(
          friendlySupabaseError(profileError, 'Could not create your profile.'),
        )
      }

      await loadCurrentUser(data.session)
    },
    [loadCurrentUser],
  )

  const updateProfile = useCallback(
    async ({ fullName, email, phone, address }: ProfileUpdateInput) => {
      if (!session?.user) {
        throw new Error('You must be logged in to update your profile.')
      }

      const cleanEmail = email.trim()
      const cleanName = fullName.trim()
      const cleanPhone = phone?.trim() || null
      const cleanAddress = address?.trim() || null

      if (!cleanName || !cleanEmail) {
        throw new Error('Please fill in your name and email.')
      }

      const currentEmail = session.user.email || user?.email || ''
      if (cleanEmail !== currentEmail) {
        const { error } = await supabase.auth.updateUser({ email: cleanEmail })
        if (error) {
          throw new Error(friendlySupabaseError(error, 'Could not update your email.'))
        }
      }

      const { error } = await supabase.from('profiles').upsert({
        id: session.user.id,
        full_name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        address: cleanAddress,
      })

      if (error) {
        throw new Error(friendlySupabaseError(error, 'Could not update your profile.'))
      }

      await refreshUser()
    },
    [refreshUser, session, user?.email],
  )

  const logout = useCallback(async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(friendlySupabaseError(error, 'Logout failed.'))
    }
    setSession(null)
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      refreshUser,
      updateProfile,
      login,
      register,
      logout,
    }),
    [user, session, loading, refreshUser, updateProfile, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useAuth pairs with AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
