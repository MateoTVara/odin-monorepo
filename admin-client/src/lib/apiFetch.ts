import { env } from "../config/env";
import ApiError from "./apiError";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
  onUnauthorized = handler;
}

const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const res = await fetch(`${env.ApiBaseUrl}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (!res.ok) return null;

    const data = await res.json();

    localStorage.setItem('authUser', JSON.stringify(data));

    return data.token;
  } catch (error) {
    return null;
  }
}

const getToken = (): string | null => {
  const authUser = localStorage.getItem('authUser');
  const token = authUser ? JSON.parse(authUser).token : null;
  return token;
}

let isRefreshing = false;

const apiFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> =>
{
  const token = getToken();

  const res = await fetch(`${env.ApiBaseUrl}${input}`, {
    ...init,
    credentials: 'include',
    headers: {
      ...init?.headers,
      ...(token && { 'Authorization': `Bearer ${token}` }),
    }
  });

  if (!res.ok) {
    let message = res.statusText;

    try {
      const errorData = await res.json();
      message = errorData.message;
    } catch { /* ignore JSON parse errors */ }

    if (res.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        const newToken = await refreshAccessToken();
        isRefreshing = false;

        if (newToken) {
          return apiFetch(input, init);
        }
      }

      onUnauthorized?.();
    }

    throw new ApiError(res.status, message);
  }

  return res;
}

export const apiFetchJson = async <T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> => {
  const res = await apiFetch(input, init);
  return res.json();
}