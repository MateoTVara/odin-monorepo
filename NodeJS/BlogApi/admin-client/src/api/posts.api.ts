import { apiFetchJson } from "../lib/apiFetch"
import type { PostPreview } from "../types/post";

const postsApi = Object.freeze({
  baseUrl: 'posts',

  async fetchAll() {
    return apiFetchJson<PostPreview[]>(`${this.baseUrl}/published`);
  }
});

export default postsApi;