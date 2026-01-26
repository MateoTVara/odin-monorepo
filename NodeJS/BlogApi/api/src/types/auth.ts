export interface CreateUser {
  username: string
  password: string
  email?: string
  name?: string
}

export interface VerifyUser {
  username: string
  password: string
}