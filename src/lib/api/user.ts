import { ErrorsResponse } from "lib/types/common";
import { UserResponse } from "lib/types/user";
import { API_BASE_URL } from "lib/utils/constant";
import { json } from "stream/consumers";
import { mergeObjects } from "swr/_internal";

const UserAPI = {
  login: async (email: string, password: string): Promise<UserResponse> => {
    const response = await fetch(`${API_BASE_URL}/users/login`, {
      method: "POST",
      body: JSON.stringify({ user: { email, password } }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) return data as UserResponse;

    throw new Error("invalid credentials");
  },
  register: async (
    username: string,
    email: string,
    password: string
  ): Promise<UserResponse | ErrorsResponse> => {
    const res = await fetch(`${API_BASE_URL}/users`, {
      method: "POST",
      body: JSON.stringify({ user: { username, email, password } }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();

    if (res.ok) return data as UserResponse;
    return data as ErrorsResponse;
  },
  update: async (
    user: {
      username: string;
      email: string;
      bio?: string;
      image?: string;
      password?: string;
    },
    token: string
  ) => {
    const body = { user };

    if (user.password?.length === 0) {
      delete body.user.password;
    }

    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    if (res.ok) return data as UserResponse;
    return data as ErrorsResponse;
  },
  currentUser: async (token: string) => {
    const res = await fetch(`${API_BASE_URL}/user`, {
      method: "GEt",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const data = await res.json();

    if (res.ok) return data as UserResponse;
    return data as ErrorsResponse;
  },
};

export default UserAPI;
