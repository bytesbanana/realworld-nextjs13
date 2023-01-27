export type User = {
  email: string;
  token: string;
  username: string;
  bio?: string;
  image?: string;
};

export type Profile = {
  username: string
  bio: string
  image: string
  following: boolean
}