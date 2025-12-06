// Security constants and configuration

// API Configuration
export const SECURITY_CONFIG = {
  // JWT Token validation
  TOKEN_EXPIRY_BUFFER: 60, // seconds before expiry to consider token invalid
  
  // Trusted issuers
  TRUSTED_ISSUERS: [
    'accounts.google.com',
    'https://accounts.google.com'
  ],

  // Allowed image domains
  ALLOWED_IMAGE_DOMAINS: [
    'image.pollinations.ai',
    'raw.githubusercontent.com',
    'via.placeholder.com'
  ],

  // Input validation
  MAX_LENGTHS: {
    POKEMON_NAME: 20,
    POKEMON_DESCRIPTION: 200,
    MAX_ABILITIES: 3
  },

  // Session
  SESSION_STORAGE_KEYS: {
    USER: 'user',
    TOKEN: 'token'
  }
} as const

// Validate image URL is from trusted domain
export const isValidImageUrl = (url: string): boolean => {
  try {
    const urlObj = new URL(url)
    return SECURITY_CONFIG.ALLOWED_IMAGE_DOMAINS.some(
      domain => urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
    )
  } catch {
    return false
  }
}

// Sanitize string input (remove HTML tags, trim)
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .trim()
    .slice(0, 500) // Max length as safety
}

// Validate Pokemon name
export const validatePokemonName = (name: string): boolean => {
  if (!name || name.length === 0) return false
  if (name.length > SECURITY_CONFIG.MAX_LENGTHS.POKEMON_NAME) return false
  
  // Only allow alphanumeric and basic characters
  const validPattern = /^[a-zA-Z0-9\s\-áéíóúñÁÉÍÓÚÑ]+$/
  return validPattern.test(name)
}

// Validate description
export const validateDescription = (description: string): boolean => {
  if (!description || description.length === 0) return false
  if (description.length > SECURITY_CONFIG.MAX_LENGTHS.POKEMON_DESCRIPTION) return false
  return true
}

// Rate limiting (client-side - basic implementation)
export class RateLimiter {
  private requests: number[] = []
  private limit: number
  private windowMs: number

  constructor(limit: number = 10, windowMs: number = 60000) {
    this.limit = limit
    this.windowMs = windowMs
  }

  canMakeRequest(): boolean {
    const now = Date.now()
    // Remove old requests outside the window
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    
    if (this.requests.length < this.limit) {
      this.requests.push(now)
      return true
    }
    
    return false
  }

  getRemainingRequests(): number {
    const now = Date.now()
    this.requests = this.requests.filter(time => now - time < this.windowMs)
    return Math.max(0, this.limit - this.requests.length)
  }
}

// Content Security Policy directives
export const CSP_DIRECTIVES = {
  'default-src': ["'self'"],
  'script-src': ["'self'", "'unsafe-inline'", "'unsafe-eval'", 'https://accounts.google.com'],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'https:', 'blob:'],
  'font-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    'https://accounts.google.com',
    'https://image.pollinations.ai',
    'https://raw.githubusercontent.com'
  ],
  'frame-src': ['https://accounts.google.com'],
  'object-src': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'"],
  'frame-ancestors': ["'none'"]
}

// Generate CSP header string
export const generateCSPHeader = (): string => {
  return Object.entries(CSP_DIRECTIVES)
    .map(([directive, values]) => `${directive} ${values.join(' ')}`)
    .join('; ')
}
