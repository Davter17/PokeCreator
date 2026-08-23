function createJWT(payload: Record<string, unknown>): string {
  const header = btoa(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  return `${header}.${body}.fake-signature`
}

export function createValidToken(overrides: Partial<Record<string, unknown>> = {}): string {
  const now = Math.floor(Date.now() / 1000)
  return createJWT({
    sub: '1234567890',
    email: 'test@gmail.com',
    name: 'Test User',
    picture: 'https://example.com/photo.png',
    exp: now + 3600,
    iss: 'https://accounts.google.com',
    ...overrides,
  })
}

export function createExpiredToken(): string {
  const now = Math.floor(Date.now() / 1000)
  return createValidToken({ exp: now - 3600 })
}

export function createTokenWithInvalidIssuer(): string {
  return createValidToken({ iss: 'https://evil.com' })
}

export function createTokenMissingFields(): string {
  return createJWT({
    exp: Math.floor(Date.now() / 1000) + 3600,
    iss: 'https://accounts.google.com',
  })
}
