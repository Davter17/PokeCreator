import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@/types/auth'
import { authService } from '@/services/authService'

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (credential: string) => void
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedUser = authService.getStoredUser()
    const storedToken = authService.getStoredToken()

    if (storedUser && storedToken) {
      setUser(storedUser)
    } else if (storedUser || storedToken) {
      authService.clearAuth()
    }

    setIsLoading(false)
  }, [])

  const login = (credential: string) => {
    try {
      const userData = authService.decodeToken(credential)

      if (!userData) {
        console.error('Failed to decode token')
        return
      }

      setUser(userData)
      authService.storeAuth(userData, credential)
    } catch (error) {
      console.error('Login error:', error instanceof Error ? error.message : 'Unknown error')
    }
  }

  const logout = () => {
    setUser(null)
    authService.clearAuth()
  }

  const isAuthenticated = !!user

  useEffect(() => {
    if (!isAuthenticated) return

    const checkTokenExpiry = () => {
      const token = authService.getStoredToken()
      if (!token) {
        logout()
      }
    }

    const interval = setInterval(checkTokenExpiry, 60000)
    return () => clearInterval(interval)
  }, [isAuthenticated])

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
