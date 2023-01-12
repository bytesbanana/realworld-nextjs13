import Head from "next/head";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import { Banner, MainContent } from "components/home";

import { Article } from "types";
import { API_BASE_URL } from "utils/constant";

type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

const fetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

const URL_GET_ARTICLES = `${API_BASE_URL}/articles?limit=10&offset=0`;

const Home: NextPage = () => {
  const router = useRouter();
  const global = router.query?.global === "true" || !router.query?.global;

  const { data, error, isLoading } = useSWR<ArticleResponse>(
    URL_GET_ARTICLES + (global ? "global=true" : ""),
    fetcher
  );

  useEffect(() => {
    mutate(URL_GET_ARTICLES + (global ? "global=true" : ""));
  }, [global]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <Head>
        <title>Home - Conduit</title>
      </Head>

      <main className="home-page">
        <Banner />

        <div className="container page">
          {data?.articles && data.articlesCount ? (
            <MainContent
              global={global}
              isLoading={isLoading}
              articles={data?.articles}
              articlesCount={data?.articlesCount}
            />
          ) : (
            <></>
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
