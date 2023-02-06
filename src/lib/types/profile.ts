export interface ProfileResponse {
  profile: Profile;
}

export interface Profile {
  username: string;
  bio?: string;
  image?: string;
  following: boolean;
}
