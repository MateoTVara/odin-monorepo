// user-client/src/hooks/posts/usePosts.ts
import { postsApi } from "../../api/posts.api";
import { useAsync } from "../useAsync";

export function usePosts() {
  return useAsync(
    () => {
      return postsApi.fetchAll();
    },
    []
  )
};