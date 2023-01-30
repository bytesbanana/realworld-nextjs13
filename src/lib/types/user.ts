export type UserResponse = {
  user: User;
};

export type User = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export const isUserResponse = (response: any) => {
  return "user" in response;
};
