export interface PostPreview {
  id: number;
  title: string;
  summary: string;
  updatedAt: Date;
  published: boolean;
}

export interface PostDetail {
  title: string;
  summary: string;
  content: string;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}