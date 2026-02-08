// user-client/src/api/posts.api.ts
import type { PostDetail, PostPreview } from "../types";
import { apiFetchJson } from "../utils/apiFetch";

class PostsApi {
  readonly baseUrl = 'posts';
  
  async fetchAll() {
    return apiFetchJson<PostPreview[]>(`${this.baseUrl}/published`);
  }

  async fetchById(id: number) {
    return apiFetchJson<PostDetail>(`${this.baseUrl}/published/${id}`);
  }
}

export const postsApi = new PostsApi();