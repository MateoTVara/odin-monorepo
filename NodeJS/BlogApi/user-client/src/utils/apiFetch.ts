// user-client/src/utils/apiFetch.ts
import { env } from "../config/env";

let onUnauthorized: (() => void) | null = null;

export const setUnauthorizedHandler = (handler: () => void): void => {
  onUnauthorized = handler;
}

export const apiFetch = async (
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> => 
{
  const res = await fetch(`${env.ApiBaseUrl}${input}`, init);

  if (res.status === 401) {
    onUnauthorized?.();
    throw new Error('Unauthorized');
  }

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`API request failed: ${res.status} ${res.statusText} - ${errorText}`);
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