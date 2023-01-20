export type User = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export type StorageUser = {
  user: User;
};
