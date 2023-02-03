import React from "react";
import UserInfo from "components/profile/UserInfo";
import { getSession, useSession } from "next-auth/react";
import ArticleToggle from "components/profile/ArticleToggle";
import ProfileAPI from "lib/api/profile";

import type { GetServerSidePropsContext } from "next";
import type { Profile } from "lib/types/profile";
import Header from "components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

interface Props {
  profile: Profile;
}

const Profile = ({ profile }: Props) => {
  const { data: session } = useSession();

  return (
    <div className="profile-page">
      <UserInfo profile={profile} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle />

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/Qr71crq.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Eric Simons
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 29
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>How to build webapps that scale</h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
              </a>
            </div>

            <div className="article-preview">
              <div className="article-meta">
                <a href="">
                  <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                </a>
                <div className="info">
                  <a href="" className="author">
                    Albert Pai
                  </a>
                  <span className="date">January 20th</span>
                </div>
                <button className="btn btn-outline-primary btn-sm pull-xs-right">
                  <i className="ion-heart"></i> 32
                </button>
              </div>
              <a href="" className="preview-link">
                <h1>
                  The song you won't ever stop singing. No matter how hard you
                  try.
                </h1>
                <p>This is the description for the post.</p>
                <span>Read more...</span>
                <ul className="tag-list">
                  <li className="tag-default tag-pill tag-outline">Music</li>
                  <li className="tag-default tag-pill tag-outline">Song</li>
                </ul>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const { username } = context.query as { username: string };

  const headers: Record<string, any> = {};

  if (session?.accessToken) {
    headers.Authorization = "Bearer " + session.accessToken;
  }

  const profileResponse = await ProfileAPI.profile(username, { headers });
  if (profileResponse) {
    return {
      props: {
        profile: profileResponse.profile,
      },
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}

export default Profile;
