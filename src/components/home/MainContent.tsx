import { ArticlePreview } from "components/shared";
import React from "react";
import { Article } from "types";
import FeedToggle from "./FeedToggle";
import Pagination from "./Pagination";
import PopularTags from "./PopularTags";

type Props = {
  global: boolean;
  isLoading: boolean;
  articles: Article[];
  articlesCount: number;
};

const MainContent = ({ global, isLoading, articles, articlesCount }: Props) => {
  return (
    <div className="row">
      <div className="col-md-9">
        <FeedToggle globalFeed={global} />

        {isLoading && <div>Loading</div>}
        {articles.map((article) => (
          <ArticlePreview article={article} key={article.slug} />
        ))}

        <div>
          <Pagination articles={articles} articlesCount={articlesCount} />
        </div>
      </div>

      <div className="col-md-3">
        <div className="sidebar">
          <PopularTags />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
