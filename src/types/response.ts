import { Article } from "./article";
import { Profile, User } from "./user";


export interface ErrorResponse {
  errors: Errors;
}
export interface Errors {
  [key: string]: string[];
}

export type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

export interface UserResponse {
  user: User;
}

export type ProfileResposne = {
  profile: Profile
}