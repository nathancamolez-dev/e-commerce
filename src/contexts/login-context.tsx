'use client'
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'

type User = { email: string } | null

interface AuthContextType {
  user: User
  login: (email: string, password: string) => Promise<string>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)

  async function login(email: string, password: string) {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    if (response.status === 200) {
      setUser({ email })
      return 'ok'
    }
    return 'error'
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
