import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";

import UserInfo from "components/profile/UserInfo";
import ArticleToggle from "components/profile/ArticleToggle";
import { authOptions } from "pages/api/auth/[...nextauth]";
import { ProfileContext } from "contexts/ProfileContex";
import ProfileAPI from "lib/api/profile";
import useSWR from "swr";

import type { GetServerSidePropsContext } from "next";
import type { Profile } from "lib/types/profile";
import { API_BASE_URL } from "lib/utils/constant";
import { PageContext } from "contexts/PageContext";
import type { ArticlesResponse } from "lib/types/articles";
import { restFetcher } from "lib/fetcher/rest";
import { useRouter } from "next/router";
import ArticleList from "components/common/ArticleList";

interface Props {
  profile: Profile;
}

const ARTICLE_LIMIT = 5;

const Profile = ({ profile }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { articleType } = useContext(ProfileContext);
  const { pageIndex, setPageIndex } = useContext(PageContext);
  const { username } = router.query;

  const isMyArticle = articleType === "MY_ARTICLES";
  const paramObj: Record<string, any> = {
    limit: ARTICLE_LIMIT.toString(),
    offset: ((pageIndex - 1) * ARTICLE_LIMIT).toString(),
    [isMyArticle ? "author" : "favorited"]: username,
  };
  const searchParams = new URLSearchParams(paramObj);

  const { data, isLoading } = useSWR<ArticlesResponse>(
    [
      `${API_BASE_URL}/articles?${searchParams.toString()}`,
      session?.accessToken,
    ],
    ([url, token]) => restFetcher(url, token)
  );

  useEffect(() => {
    setPageIndex(1);
  }, []);

  return (
    <div className="profile-page">
      <UserInfo profile={profile} />
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <ArticleToggle />
            {!isLoading && (
              <>
                {data?.articles && (
                  <ArticleList
                    articles={data.articles}
                    articlesCount={data.articlesCount}
                  />
                )}
              </>
            )}
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
