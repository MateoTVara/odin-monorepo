import type { User, Comment } from ".";

export interface PostPreview {
  id: number;
  title: string;
  content: string;
  updatedAt: Date;
}

export interface PostDetail {
  title: string;
  content: string;
  comments: Comment[];
  author: User;
  createdAt: Date;
  updatedAt: Date;
}