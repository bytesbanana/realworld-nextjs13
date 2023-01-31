import { ErrorsResponse } from "lib/types/common";
import { UserResponse } from "lib/types/user";
import { API_BASE_URL } from "lib/utils/constant";
import { json } from "stream/consumers";

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
};

export default UserAPI;
