// admin-client/src/api/posts.api.ts
import { apiFetchJson } from "../lib/apiFetch"
import type { PostDetail, PostPreview } from "../types/post";

const postsApi = Object.freeze({
  baseUrl: 'posts',

  async create(data: Partial<PostDetail>) {
    return apiFetchJson<PostDetail>(`${this.baseUrl}/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  },

  async fetchAll() {
    return apiFetchJson<PostPreview[]>(`${this.baseUrl}/`);
  }, 

  async fetchById(postId: string) {
    return apiFetchJson<PostDetail>(`${this.baseUrl}/${postId}`);
  },

  async editById(postId: string, data: Partial<PostDetail>) {
    return apiFetchJson<PostDetail>(`${this.baseUrl}/${postId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
  }
});

export default postsApi;