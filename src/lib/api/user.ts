import { UserResponse } from "lib/types/user";
import { API_BASE_URL } from "lib/utils/constant";

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
};

export default UserAPI;
