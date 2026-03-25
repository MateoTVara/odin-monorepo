import { useEffect, useState } from "react";

export default function useAsync<T>(asyncFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let mounted = true;

    const run = async () => {
      try {
        setLoading(true);
        const result = await asyncFn();
        if (mounted) setData(result);
      } catch (error) {
        if (mounted) setError(error);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    run();

    return () => {
      mounted = false;
    }
  }, deps);

  return { data, loading, error };
}