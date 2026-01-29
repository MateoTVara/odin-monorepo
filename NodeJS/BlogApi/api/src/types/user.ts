import { Roles } from "../../generated/prisma/enums"

export interface CreateUser {
  username: string
  password: string
  confirmPassword?: string
  email?: string
  name?: string
}

export interface VerifyUser {
  username: string
  password: string
}

export interface UserOwnershipContext {
  userId: number
  role: Roles
}