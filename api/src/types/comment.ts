import type { AtLeastOne } from "../utils/types";

export interface CreateCommentBody {
  content: string;
  postId: number;
}

export interface CreateComment extends CreateCommentBody {
  authorId: number;
}

export type UpdateComment = AtLeastOne<{
  content: string;
}>