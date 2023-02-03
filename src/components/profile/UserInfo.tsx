import React, { MouseEventHandler, useState } from "react";
import Link from "next/link";

import type { Profile } from "lib/types/profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import ProfileAPI from "lib/api/profile";

interface Props {
  profile: Profile;
}

const UserInfo = ({ profile }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [following, setFollowing] = useState(profile.following);

  const toggleFollowUser: MouseEventHandler = async (e) => {
    if (!session || !session.accessToken) {
      router.push("/auth/login");
      return;
    }

    const res = await ProfileAPI.setFollow(
      profile.username,
      !following,
      session?.accessToken
    );

    if (res) {
      setFollowing((isFollow) => !isFollow);
    }
  };

  const isCurrentUserProfile = session?.user?.name === profile.username;

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {isCurrentUserProfile && (
              <Link
                href="/settings"
                className={`btn btn-sm btn-outline-secondary action-btn`}
              >
                <i className="ion-gear-a"></i>
                &nbsp; Edit Profile Settings
              </Link>
            )}
            {!isCurrentUserProfile && (
              <button
                className={`btn btn-sm btn${
                  !following ? "-outline" : ""
                }-secondary action-btn`}
                onClick={toggleFollowUser}
              >
                <i className="ion-plus-round"></i>
                &nbsp; {following ? "Unfollow" : "Follow"} {profile.username}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
