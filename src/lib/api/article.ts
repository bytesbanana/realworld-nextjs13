import { ArticleResponse } from "./../types/articles";
import { API_BASE_URL } from "./../utils/constant";

import type { ErrorsResponse } from "lib/types/common";

const ArticleAPI = {
  setFavorite: async (
    slug: string,
    favorite: boolean,
    token: string
  ): Promise<ArticleResponse | ErrorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/favorite`, {
      method: favorite ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();
    if (res.ok) return data as ArticleResponse;

    return data as ErrorsResponse;
  },
};

export default ArticleAPI;
