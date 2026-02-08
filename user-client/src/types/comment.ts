// user-client/src/types/comment.ts
import type { User } from ".";

export interface CommentCreateData {
  content: string;
  postId: number;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
}