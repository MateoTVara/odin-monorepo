import { AtLeastOne } from "../utils/types";

export interface CreatePost {
  title: string;
  content: string;
  authorId: number;
}

export type UpdatePost = AtLeastOne<{
  title: string;
  content: string;
  published: boolean;
}>