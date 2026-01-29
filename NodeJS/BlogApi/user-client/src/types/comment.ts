import type { User } from ".";

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: Date;
}