import { ArticleResponse } from "./../types/articles";
import { API_BASE_URL } from "./../utils/constant";

import type { ErrorsResponse } from "lib/types/common";

type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

const ArticleAPI = {
  setFavorite: async (
    slug: string,
    favorite: boolean,
    token: string
  ): Promise<ArticleResponse | null> => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
      method: favorite ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) return data as ArticleResponse;

    return null;
  },
  create: async (
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
    },
    token: string
  ): Promise<ArticleResponse | ErrorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ article }),
    });
    const data = await res.json();
    if (res.ok) {
      return data as ArticleResponse;
    }
    return data as ErrorsResponse;
  },
  update: async (
    slug: string,
    article: {
      title: string;
      description: string;
      body: string;
      tagList: string[];
    },
    token: string
  ): Promise<ArticleResponse | ErrorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ article }),
    });

    const data = await res.json();
    if (res.ok) {
      return data as ArticleResponse;
    }
    return data as ErrorsResponse;
  },
  getBySlug: async (slug: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) {
      return data as ArticleResponse;
    }
    return null;
  },
};

export default ArticleAPI;
