// user-client/src/utils/apiFetch.ts
import { env } from "../config/env";
import { ApiError } from "./apiError";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
  onUnauthorized = handler;
}

const getToken = () => {
  const authUser = localStorage.getItem('authUser');
  const token = authUser ? JSON.parse(authUser).token : null;
  return token;
}

const apiFetch = async (
  input: RequestInfo,
  init: RequestInit = {}
): Promise<Response> => 
{
  const token = getToken();

  const res = await fetch(`${env.ApiBaseUrl}${input}`, {
    ...init,
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
      onUnauthorized?.();
    }

    throw new ApiError(res.status, message);
  }

  return res;
}

export async function apiFetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await apiFetch(input, init);
  return res.json();
}