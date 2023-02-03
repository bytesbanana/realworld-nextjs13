import { PageContext } from "contexts/PageContext";
import React, { useContext } from "react";
import ArticlePreview from "./ArticlePreview";
import PaginationList from "./PaginationList";
import type { Article } from "lib/types/articles";

interface Props {
  articles?: Article[];
  articlesCount: number;
}

const ArticleList = ({ articles, articlesCount }: Props) => {
  const { pageIndex } = useContext(PageContext);

  return (
    <>
      {articles &&
        articlesCount > 0 &&
        articles.map((article) => (
          <ArticlePreview article={article} key={article.slug} />
        ))}
      {articlesCount === 0 && (
        <div className="article-preview">No articles are here... yet.</div>
      )}
      <PaginationList
        pageIndex={pageIndex}
        totalPages={Math.ceil(articlesCount / 10)}
      />
    </>
  );
};

export default ArticleList;
