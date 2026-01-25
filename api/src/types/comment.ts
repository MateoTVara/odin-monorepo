import type { AtLeastOne } from "../utils/types";

export interface CreateComment {
  content: string;
  postId: number;
  authorId: number;
}

export type UpdateComment = AtLeastOne<{
  content: string;
}>