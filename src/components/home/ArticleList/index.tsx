import { PageContext } from "contexts/PageContext";
import { Article } from "lib/types/articles";
import React, { useContext } from "react";
import ArticlePreview from "./ArticlePreview";
import PaginationList from "./PaginationList";

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
