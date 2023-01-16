import { Article } from "./article";

export type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

export interface ErrorResponse {
  errors: Errors;
}

export interface Errors {
  [key: string]: string[];
}
