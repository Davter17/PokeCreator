import { describe, it, expect, beforeEach, vi } from 'vitest'
import { authService } from '@/services/authService'
import {
  createValidToken,
  createExpiredToken,
  createTokenWithInvalidIssuer,
  createTokenMissingFields,
} from './helpers'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('decodeToken', () => {
    it('decodes a valid token and returns the user', () => {
      const token = createValidToken()
      const user = authService.decodeToken(token)

      expect(user).not.toBeNull()
      expect(user!.id).toBe('1234567890')
      expect(user!.email).toBe('test@gmail.com')
      expect(user!.name).toBe('Test User')
      expect(user!.picture).toBe('https://example.com/photo.png')
    })

    it('returns null for invalid JWT format (not 3 parts)', () => {
      expect(authService.decodeToken('invalid.token')).toBeNull()
      expect(authService.decodeToken('notajwt')).toBeNull()
    })

    it('returns null for a token missing required fields', () => {
      const token = createTokenMissingFields()
      expect(authService.decodeToken(token)).toBeNull()
    })

    it('returns null for an expired token', () => {
      const token = createExpiredToken()
      expect(authService.decodeToken(token)).toBeNull()
    })

    it('returns null for a token with an invalid issuer', () => {
      const token = createTokenWithInvalidIssuer()
      expect(authService.decodeToken(token)).toBeNull()
    })

    it('accepts both "accounts.google.com" and "https://accounts.google.com" issuers', () => {
      const tokenHttps = createValidToken({ iss: 'https://accounts.google.com' })
      const tokenBare = createValidToken({ iss: 'accounts.google.com' })

      expect(authService.decodeToken(tokenHttps)).not.toBeNull()
      expect(authService.decodeToken(tokenBare)).not.toBeNull()
    })
  })

  describe('storeAuth & getStoredUser', () => {
    it('stores and retrieves a user', () => {
      const user = {
        id: 'abc123',
        email: 'test@example.com',
        name: 'Test',
      }
      authService.storeAuth(user as never, 'fake-token')

      const retrieved = authService.getStoredUser()
      expect(retrieved).toEqual(user)
    })

    it('returns null when no user is stored', () => {
      expect(authService.getStoredUser()).toBeNull()
    })

    it('returns null and clears auth when stored user is invalid', () => {
      localStorage.setItem('user', JSON.stringify({ foo: 'bar' }))
      expect(authService.getStoredUser()).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })

    it('returns null and clears auth when stored user JSON is corrupted', () => {
      localStorage.setItem('user', 'not-json{')
      expect(authService.getStoredUser()).toBeNull()
      expect(localStorage.getItem('user')).toBeNull()
    })
  })

  describe('getStoredToken', () => {
    it('returns a valid stored token', () => {
      const token = createValidToken()
      localStorage.setItem('token', token)

      expect(authService.getStoredToken()).toBe(token)
    })

    it('returns null when no token is stored', () => {
      expect(authService.getStoredToken()).toBeNull()
    })

    it('returns null and clears auth when token format is invalid', () => {
      localStorage.setItem('token', 'not.a.jwt')
      expect(authService.getStoredToken()).toBeNull()
      expect(localStorage.getItem('token')).toBeNull()
    })

    it('returns null and clears auth when stored token is expired', () => {
      localStorage.setItem('token', createExpiredToken())
      expect(authService.getStoredToken()).toBeNull()
      expect(localStorage.getItem('token')).toBeNull()
    })
  })

  describe('clearAuth', () => {
    it('removes both user and token from localStorage', () => {
      localStorage.setItem('user', '{"id":"1"}')
      localStorage.setItem('token', 'some.token.here')

      authService.clearAuth()

      expect(localStorage.getItem('user')).toBeNull()
      expect(localStorage.getItem('token')).toBeNull()
    })
  })
})
