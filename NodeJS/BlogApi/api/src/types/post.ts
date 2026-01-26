import { AtLeastOne } from "../utils/types";

export interface CreatePostBody {
  title: string;
  content: string;
}

export interface CreatePost extends CreatePostBody {
  authorId: number;
}

export type UpdatePost = AtLeastOne<{
  title: string;
  content: string;
  published: boolean;
}>