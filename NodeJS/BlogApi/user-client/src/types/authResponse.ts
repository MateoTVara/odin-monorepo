import type { User } from "./user";

export interface AuthResponse {
  token: string;
  user: User;
}

export interface AuthError {
  error: string;
}