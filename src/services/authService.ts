import { User } from '../types/auth'

export const authService = {
  // Decode Google JWT token
  decodeToken: (credential: string): User | null => {
    try {
      const base64Url = credential.split('.')[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )

      const decoded = JSON.parse(jsonPayload)

      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      }
    } catch (error) {
      console.error('Error decoding token:', error)
      return null
    }
  },

  // Get stored user
  getStoredUser: (): User | null => {
    const storedUser = localStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  },

  // Get stored token
  getStoredToken: (): string | null => {
    return localStorage.getItem('token')
  },

  // Store user and token
  storeAuth: (user: User, token: string) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  },

  // Clear auth data
  clearAuth: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
  },
}
