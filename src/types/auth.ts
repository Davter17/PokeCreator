export interface User {
  id: string
  email: string
  name: string
  picture?: string
}

export interface AuthResponse {
  credential: string
  clientId: string
  select_by: string
}
