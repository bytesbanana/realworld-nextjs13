import { ArticlePreview } from "components/shared";

import FeedToggle from "./FeedToggle";
import Pagination from "./Pagination";
import useSWR, { mutate } from "swr";
import { API_BASE_URL } from "utils/constant";
import restFetcher from "fetcher/rest";
import { usePagination } from "contexts/PaginationContex";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { ArticleResponse } from "types/response";

const URL_GET_ARTICLES = `${API_BASE_URL}/articles`;

const MainContent = () => {
  const router = useRouter();
  const global = router.query?.global === "true" || !router.query?.global;
  const { setPagination, ...pagination } = usePagination();
  const { limit, offset } = pagination;

  const searchParam = new URLSearchParams({
    limit: limit + "",
    offset: offset + "",
    global: global ? "true" : "false",
  });

  const { data, error, isLoading } = useSWR<ArticleResponse>(
    `${URL_GET_ARTICLES}?limit=${limit}&offset=${offset}&${"global=true"}`,
    restFetcher
  );

  const { articles, articlesCount } = data || {
    articles: [],
    articlesCount: 0,
  };

  useEffect(() => {
    mutate(`${URL_GET_ARTICLES}?${searchParam.toString()}`);
  }, [global]);

  return (
    <>
      <FeedToggle globalFeed={global} />

      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}
      {error && <div>Failed to load artciles.</div>}

      {isLoading && <div className="article-preview">Loading articles...</div>}
      <div>
        <Pagination articlesCount={articlesCount} />
      </div>
    </>
  );
};

export default MainContent;
