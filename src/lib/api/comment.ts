import { API_BASE_URL } from "./../utils/constant";
import type { ErrorsResponse } from "lib/types/common";
import type { CommentsResponse, CommentResponse } from "./../types/comment";

const CommentAPI = {
  getComments: async (
    slug: string,
    token?: string
  ): Promise<CommentsResponse | null> => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/comments`, {
      headers: {
        Authorization: token ? "Bearer " + token : "",
      },
    });

    if (res.ok) {
      return (await res.json()) as CommentsResponse;
    }

    return null;
  },

  add: async (slug: string, body: string, token: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Bearer " + token : "",
      },
      body: JSON.stringify({ comment: { body } }),
    });
    const data = await res.json();
    if (res.ok) {
      return data as CommentResponse;
    }

    return data as ErrorsResponse;
  },
  remove: async (slug: string, id: number, token: string) => {
    const res = await fetch(`${API_BASE_URL}/articles/${slug}/comments/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? "Bearer " + token : "",
      },
    });

    if (res.ok) {
      return true;
    }

    return false;
  },
};

export default CommentAPI;
