import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR, { mutate } from "swr";

import { Banner, MainContent, PopularTags } from "components/home";

import { usePagination } from "contexts/PaginationContex";
import { Article } from "types";
import { API_BASE_URL } from "utils/constant";

type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

const fetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

const URL_GET_ARTICLES = `${API_BASE_URL}/articles`;

const Home: NextPage = () => {
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
    fetcher
  );

  useEffect(() => {
    mutate(`${URL_GET_ARTICLES}?${searchParam.toString()}`);
  }, [global]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home - Conduit</title>
        <meta name="description" content="Next.js 13 + SWR realword demo" />
      </Head>

      <main className="home-page">
        <Banner />

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <MainContent
                global={global}
                isLoading={isLoading}
                articles={data?.articles || []}
                articlesCount={data?.articlesCount || 0}
              />

              {error && <div>Failed to load artciles.</div>}
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <PopularTags />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
