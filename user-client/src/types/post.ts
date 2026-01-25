import type { Comment } from ".";

export interface Post {
  id: number
  title: string
  content?: string
  published: boolean
  comments: Comment[]
  authorId: number
  createdAt: Date
  updatedAt: Date
}