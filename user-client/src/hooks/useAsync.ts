// user-client/src/hooks/useAsync.ts
import { useEffect, useState } from "react";

export function useAsync<T>(
  fn: () => Promise<T>,
  deps: unknown[]
)
{
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);
  
  useEffect(() =>{
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        const data = await fn();
        if (!cancelled) setData(data);
      } catch (error) {
        if (!cancelled) setError(error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, deps);

  return { data, loading, error };
}