export interface User {
  id: number
  displayName: string
  avatarUrl: string
  salt: string
  hash: string
  passwordHash: string
  passwordSalt: string
}
