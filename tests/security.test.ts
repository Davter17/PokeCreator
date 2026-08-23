import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  validatePokemonName,
  validateConcept,
  validateDescription,
  sanitizeInput,
  isValidImageUrl,
  RateLimiter,
} from '@/utils/security'

describe('validateConcept', () => {
  it('accepts a valid concept', () => {
    expect(validateConcept('dragon')).toBe(true)
    expect(validateConcept('fénix')).toBe(true)
    expect(validateConcept('robot123')).toBe(true)
  })

  it('rejects an empty concept', () => {
    expect(validateConcept('')).toBe(false)
  })

  it('rejects concepts with spaces', () => {
    expect(validateConcept('fire dragon')).toBe(false)
    expect(validateConcept('hola mundo')).toBe(false)
  })

  it('rejects concepts exceeding 20 characters', () => {
    expect(validateConcept('abcdefghijklmnopqrstuvwxyz')).toBe(false)
  })

  it('accepts a concept at exactly 20 characters', () => {
    expect(validateConcept('12345678901234567890')).toBe(true)
  })
})

describe('validatePokemonName', () => {
  it('accepts a valid name', () => {
    expect(validatePokemonName('Dracoflame')).toBe(true)
  })

  it('accepts names with accents and numbers', () => {
    expect(validatePokemonName('Fénix99')).toBe(true)
    expect(validatePokemonName('Ñandú 3')).toBe(true)
  })

  it('rejects an empty name', () => {
    expect(validatePokemonName('')).toBe(false)
  })

  it('rejects a name exceeding 20 characters', () => {
    expect(validatePokemonName('abcdefghijklmnopqrstuvwxyz')).toBe(false)
  })

  it('rejects names with special characters', () => {
    expect(validatePokemonName('Pik@chu')).toBe(false)
    expect(validatePokemonName('<script>')).toBe(false)
  })
})

describe('validateDescription', () => {
  it('accepts a valid description', () => {
    expect(validateDescription('A powerful dragon Pokémon')).toBe(true)
  })

  it('rejects an empty description', () => {
    expect(validateDescription('')).toBe(false)
  })

  it('rejects a description exceeding 200 characters', () => {
    const long = 'a'.repeat(201)
    expect(validateDescription(long)).toBe(false)
  })

  it('accepts a description at exactly 200 characters', () => {
    const exact = 'a'.repeat(200)
    expect(validateDescription(exact)).toBe(true)
  })
})

describe('sanitizeInput', () => {
  it('removes HTML tags', () => {
    expect(sanitizeInput('<script>alert(1)</script>')).toBe('alert(1)')
  })

  it('trims leading and trailing whitespace', () => {
    expect(sanitizeInput('  hello  ')).toBe('hello')
  })

  it('limits length to 500 characters', () => {
    const long = 'x'.repeat(600)
    expect(sanitizeInput(long).length).toBe(500)
  })
})

describe('isValidImageUrl', () => {
  it('accepts pollinations.ai URLs', () => {
    expect(isValidImageUrl('https://image.pollinations.ai/prompt/test')).toBe(true)
  })

  it('accepts raw.githubusercontent.com URLs', () => {
    expect(isValidImageUrl('https://raw.githubusercontent.com/user/repo/main/img.png')).toBe(true)
  })

  it('accepts via.placeholder.com URLs', () => {
    expect(isValidImageUrl('https://via.placeholder.com/150')).toBe(true)
  })

  it('rejects URLs from untrusted domains', () => {
    expect(isValidImageUrl('https://evil.com/image.png')).toBe(false)
  })

  it('rejects invalid URLs', () => {
    expect(isValidImageUrl('not-a-url')).toBe(false)
  })
})

describe('RateLimiter', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('allows requests under the limit', () => {
    const limiter = new RateLimiter(5, 60000)
    for (let i = 0; i < 5; i++) {
      expect(limiter.canMakeRequest()).toBe(true)
    }
  })

  it('blocks requests over the limit', () => {
    const limiter = new RateLimiter(3, 60000)
    for (let i = 0; i < 3; i++) {
      limiter.canMakeRequest()
    }
    expect(limiter.canMakeRequest()).toBe(false)
  })

  it('resets after the time window passes', () => {
    const limiter = new RateLimiter(2, 1000)
    limiter.canMakeRequest()
    limiter.canMakeRequest()
    expect(limiter.canMakeRequest()).toBe(false)

    vi.advanceTimersByTime(1001)
    expect(limiter.canMakeRequest()).toBe(true)
  })

  it('reports remaining requests correctly', () => {
    const limiter = new RateLimiter(10, 60000)
    limiter.canMakeRequest()
    limiter.canMakeRequest()
    expect(limiter.getRemainingRequests()).toBe(8)
  })
})
