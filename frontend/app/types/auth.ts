export type AuthCredentials = {
  email: string
  password: string
}

export type User = {
  id: number
  email: string
}

export type AuthResponse = {
  token: string
  user: User
}
