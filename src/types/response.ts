import { Article } from "./article";
import { User } from "./user";

export type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

export interface ErrorResponse {
  errors: Errors;
}

export interface UserResponse {
  user: User;
}

export interface Errors {
  [key: string]: string[];
}
