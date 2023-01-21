import { ArticlePreview } from "components/shared";

import FeedToggle from "./FeedToggle";
import Pagination from "./Pagination";
import useSWR from "swr";
import { API_BASE_URL } from "utils/constant";
import restFetcher from "fetcher/rest";
import { usePagination } from "contexts/PaginationContex";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArticleResponse } from "types/response";

const URL_GET_ARTICLES = `${API_BASE_URL}/articles`;
const URL_GET_ARTICLES_FEED = `${API_BASE_URL}/articles/feed`;

const MainContent = () => {
  const router = useRouter();
  const global = router.query?.global === "true" || !router.query?.global;
  const { setPagination, ...pagination } = usePagination();
  const { limit, offset } = pagination;

  const searchParam = new URLSearchParams({
    limit: limit.toString(),
    offset: offset.toString(),
  });

  let articlesFetchUrl = "";
  switch (true) {
    case !global:
      articlesFetchUrl = `${URL_GET_ARTICLES_FEED}?${searchParam.toString()}`;
      break;

    default:
      articlesFetchUrl = `${URL_GET_ARTICLES}?${searchParam.toString()}`;
      break;
  }

  const { data, error, isLoading } = useSWR<ArticleResponse>(
    articlesFetchUrl,
    restFetcher
  );

  const { articles, articlesCount } = data || {
    articles: [],
    articlesCount: 0,
  };

  useEffect(() => {
    setPagination({ offset: 0, limit: 10, currentPage: 1 });
  }, [global]);

  return (
    <>
      <FeedToggle globalFeed={global} />

      {articles &&
        articles.map((article) => (
          <ArticlePreview article={article} key={article.slug} />
        ))}
      {!isLoading && articlesCount === 0 ? (
        <div className="article-preview">No articles are here... yet.</div>
      ) : (
        <></>
      )}
      {error && <div>Failed to load artciles.</div>}

      {isLoading && <div className="article-preview">Loading articles...</div>}

      <Pagination articlesCount={articlesCount} />
    </>
  );
};

export default MainContent;
