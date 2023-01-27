import { Article } from "./article";
import { Profile, User } from "./user";


export interface ErrorResponse {
  errors: Errors;
}
export interface Errors {
  [key: string]: string[];
}

export type ArticlesResponse = {
  articles: Article[];
  articlesCount: number;
};

export type ArticleResponse = {
  article: Article;
};

export interface UserResponse {
  user: User;
}

export type ProfileResposne = {
  profile: Profile
}