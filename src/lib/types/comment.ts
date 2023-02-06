import { Author } from "./articles";

export interface CommentsResponse {
  comments: Comment[];
}

export interface CommentResponse {
  comment: Comment;
}

export interface Comment {
  id: number;
  createAt: string;
  updatedAt: string;
  body: string;
  author: Author;
}
