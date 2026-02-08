import { AtLeastOne } from "../utils/types";

export interface CreatePostBody {
  title: string;
  content: string;
  summary: string;
}

export interface CreatePost extends CreatePostBody {
  authorId: number;
}

export type UpdatePost = AtLeastOne<{
  title: string;
  content: string;
  summary: string;
  published: boolean;
}>