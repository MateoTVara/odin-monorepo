import apiFetch from "./apiFetch";

export default async function apiFetchJson<T>(
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await apiFetch(input, init);
  return res.json() as Promise<T>;
}