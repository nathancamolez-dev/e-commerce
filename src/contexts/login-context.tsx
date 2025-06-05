'use client'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

type User = {
  email: string
  name: string
  avatar: string
  address: string
} | null

interface AuthContextType {
  user: User
  login: (email: string, password: string) => Promise<string>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem('user')
      }
    }
  }, [])
  async function login(email: string, password: string) {
    const response = await fetch('http://localhost:3000/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const { user } = await response.json()
    if (!user) {
      return 'error'
    }

    if (response.status === 200) {
      const loggedUser = {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        address: user.address,
      }
      setUser(loggedUser)
      localStorage.setItem('user', JSON.stringify(loggedUser))
      return 'ok'
    }
    return 'error'
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('user')
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
