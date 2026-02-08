// user-client/src/hooks/posts/usePost.ts
import { postsApi } from "../../api/posts.api";
import type { PostDetail } from "../../types";
import { useAsync } from "../useAsync";

export function usePost(id: number | null) {
  return useAsync<PostDetail>(
    () => {
      if (id === null) {
        return Promise.reject("no id");
      }
      return postsApi.fetchById(id);
    },
    [id]
  );
}