// user-client/src/api/auth.api.ts
import type { AuthError, AuthResponse } from "../types/authResponse";
import { apiFetchJson } from "../utils/apiFetch";

class AuthApi {
  readonly baseUrl = 'auth';

  async login(
    data: Record<string, FormDataEntryValue>
  ) {
    return apiFetchJson<AuthResponse | AuthError>(`${this.baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }

  async signup(
    data: Record<string, FormDataEntryValue>
  ) {
    return apiFetchJson<AuthResponse | AuthError>(`${this.baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}

export const authApi = new AuthApi();