import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type User = {
  email: string
  displayName: string
  phone?: string
}

type AuthContextValue = {
  user: User | null
  login: (email: string, password: string) => void
  register: (
    displayName: string,
    email: string,
    password: string,
    phone?: string,
  ) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const raw = localStorage.getItem('lumina_user')
      return raw ? (JSON.parse(raw) as User) : null
    } catch {
      return null
    }
  })

  const persist = useCallback((next: User | null) => {
    setUser(next)
    if (next) localStorage.setItem('lumina_user', JSON.stringify(next))
    else localStorage.removeItem('lumina_user')
  }, [])

  const login = useCallback((email: string, _password: string) => {
    void _password
    persist({
      email,
      displayName: email.split('@')[0] ?? 'Guest',
    })
  }, [persist])

  const register = useCallback(
    (
      displayName: string,
      email: string,
      _password: string,
      phone?: string,
    ) => {
      void _password
      persist({
        email,
        displayName,
        ...(phone?.trim() ? { phone: phone.trim() } : {}),
      })
    },
    [persist],
  )

  const logout = useCallback(() => {
    persist(null)
  }, [persist])

  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- useAuth pairs with AuthProvider
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
