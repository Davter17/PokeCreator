import { User } from '@/types/auth'

export const authService = {
  // Decode and validate Google JWT token
  decodeToken: (credential: string): User | null => {
    try {
      // Validate JWT format (3 parts separated by dots)
      const parts = credential.split('.')
      if (parts.length !== 3) {
        console.error('Invalid JWT format')
        return null
      }

      // Decode payload (second part)
      const base64Url = parts[1]
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      )

      const decoded = JSON.parse(jsonPayload)

      // Validate required fields
      if (!decoded.sub || !decoded.email || !decoded.name) {
        console.error('Missing required fields in token')
        return null
      }

      // Validate token expiration
      const now = Math.floor(Date.now() / 1000)
      if (decoded.exp && decoded.exp < now) {
        console.error('Token has expired')
        return null
      }

      // Validate issuer (Google)
      if (decoded.iss !== 'accounts.google.com' && decoded.iss !== 'https://accounts.google.com') {
        console.error('Invalid token issuer')
        return null
      }

      return {
        id: decoded.sub,
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
      }
    } catch (error) {
      console.error('Error decoding token:', error instanceof Error ? error.message : 'Unknown error')
      return null
    }
  },

  // Get stored user
  getStoredUser: (): User | null => {
    try {
      const storedUser = localStorage.getItem('user')
      if (!storedUser) return null

      const user = JSON.parse(storedUser)
      
      // Validate user object structure
      if (!user.id || !user.email || !user.name) {
        console.error('Invalid stored user data')
        authService.clearAuth()
        return null
      }

      return user
    } catch (error) {
      console.error('Error reading stored user:', error instanceof Error ? error.message : 'Unknown error')
      authService.clearAuth()
      return null
    }
  },

  // Get stored token and validate expiration
  getStoredToken: (): string | null => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return null

      // Validate token format
      const parts = token.split('.')
      if (parts.length !== 3) {
        console.error('Invalid stored token format')
        authService.clearAuth()
        return null
      }

      // Check expiration
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')))
      const now = Math.floor(Date.now() / 1000)
      
      if (payload.exp && payload.exp < now) {
        console.error('Stored token has expired')
        authService.clearAuth()
        return null
      }

      return token
    } catch (error) {
      console.error('Error validating stored token:', error instanceof Error ? error.message : 'Unknown error')
      authService.clearAuth()
      return null
    }
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
