import type { ProfileResponse } from "lib/types/profile";
import { API_BASE_URL } from "lib/utils/constant";

const ProfileAPI = {
  profile: async (
    username: string,
    options?: {
      headers: Record<string, any>;
    }
  ) => {
    const requestInit: RequestInit = {
      method: "GET",
    };

    if (options?.headers) {
      requestInit.headers = options.headers;
    }

    const res = await fetch(
      `${API_BASE_URL}/profiles/${username}`,
      requestInit
    );

    if (res.ok) return (await res.json()) as ProfileResponse;
    return null;
  },
  setFollow: async (username: string, isFollow: boolean, token: string) => {
    const res = await fetch(`${API_BASE_URL}/profiles/${username}/follow`, {
      method: isFollow ? "POST" : "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (res.ok) return (await res.json()) as ProfileResponse;
    return null;
  },
};

export default ProfileAPI;
