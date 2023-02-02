import React, { useContext, useState } from "react";
import { useSession } from "next-auth/react";
import Banner from "components/home/Banner";
import FeedToggle from "components/home/FeedToggle";
import Sidebar from "components/home/Sidebar";
import TagAPI from "lib/api/tag";
import ArticleList from "components/home/ArticleList";
import useSWR from "swr";
import { API_BASE_URL } from "lib/utils/constant";
import { restFetcher } from "lib/fetcher/rest";
import { ArticlesResponse } from "lib/types/articles";
import { PageContext } from "contexts/PageContext";
import { ArticleContext } from "contexts/ArticleContext";

interface Props {
  tags: string[];
}

const Home = ({ tags }: Props) => {
  const { data: session } = useSession();

  const { pageIndex } = useContext(PageContext);
  const { currentFeedType, selectedTag } = useContext(ArticleContext);

  const paramObj: Record<string, any> = {
    limit: "10",
    offset: ((pageIndex - 1) * 10).toString(),
  };

  if (currentFeedType === "TAG") {
    paramObj.tag = selectedTag;
  }

  const searchParams = new URLSearchParams(paramObj);
  let fetchUrl = `${API_BASE_URL}/articles`;
  if (currentFeedType === "YOUR") {
    fetchUrl = `${API_BASE_URL}/articles/feed`;
  }

  const {
    data: articlesResponse,
    isLoading: loadingArticles,
    error: errorLoadArticles,
  } = useSWR<ArticlesResponse>(
    [`${fetchUrl}?${searchParams.toString()}`, session?.accessToken],
    ([url, token]) => restFetcher(url, token)
  );

  return (
    <div className="home-page">
      {!session && <Banner />}

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            {/* FEED TOGGLE */}
            <FeedToggle />
            {!loadingArticles && (
              <>
                {articlesResponse?.articles && (
                  <ArticleList
                    articles={articlesResponse.articles}
                    articlesCount={articlesResponse.articlesCount}
                  />
                )}
              </>
            )}

            {loadingArticles && (
              <div className="article-preview">Loading articles...</div>
            )}

            {errorLoadArticles && (
              <div className="article-preview">Failed to fecth articles.</div>
            )}
          </div>

          <div className="col-md-3">
            <Sidebar tags={tags} />
          </div>
        </div>
      </div>
    </div>
  );
};

Home.getInitialProps = async () => {
  const tagResponse = await TagAPI.getAllTags();

  return {
    tags: tagResponse.tags,
  };
};

export default Home;
