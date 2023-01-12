import Head from "next/head";
import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useSWR, { mutate } from "swr";

import { FeedToggle, PopularTags, Banner, Pagination } from "components/home";

import { ArticlePreview } from "components/shared";
import { Article } from "types";

type ArticleResponse = {
  articles: Article[];
  articlesCount: number;
};

const fetcher = (url: string, method: string) =>
  fetch(url, { method }).then((res) => res.json());

const URL_GET_ARTICLES = "/articles.json?";

const Home: NextPage = () => {
  const router = useRouter();
  const global = router.query?.global === "true";

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
          <div className="row">
            <div className="col-md-9">
              <FeedToggle globalFeed={global} />

              {isLoading && <div>Loading</div>}
              {data?.articles.map((article) => (
                <ArticlePreview article={article} key={article.slug} />
              ))}

              <div>
                {data?.articles && data.articlesCount ? (
                  <Pagination
                    articles={data?.articles}
                    articlesCount={data?.articlesCount}
                  />
                ) : (
                  <></>
                )}
              </div>
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
