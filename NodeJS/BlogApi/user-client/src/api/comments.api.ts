// user-client/src/api/comments.api.ts
import type { Comment, CommentCreateData } from "../types";
import { apiFetchJson } from "../utils/apiFetch";

class CommentsApi {
  readonly baseUrl = 'comments';

  async create(data: CommentCreateData) {
    return await apiFetchJson<Comment>(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    });
  }
}

export const commentsApi = new CommentsApi();