import { env } from "../env";
import ApiError from "../errors/apiError";

export default async function apiFetch(
  input: RequestInfo,
  init?: RequestInit
) {
  const res = await fetch(`${env.ApiBaseUrl}/${input}`, {
    ...init,
    credentials: "include",
    headers: {
      ...init?.headers,
    },
  });

  if (!res.ok) {
    let message = res.statusText;
    try {
      const errorData: ApiError = await res.json();
      message = errorData.message || message;
    } catch (error) {
      console.error("Error parsing error response:", error);
    }

    throw new ApiError(res.status, message);
  }

  return res;
}