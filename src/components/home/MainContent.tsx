import { ArticlePreview } from "components/shared";
import { Article } from "types";
import FeedToggle from "./FeedToggle";
import Pagination from "./Pagination";

type Props = {
  global: boolean;
  isLoading: boolean;
  articles: Article[] | undefined;
  articlesCount: number | 0;
};

const MainContent = ({
  global,
  isLoading,
  articles = [],
  articlesCount,
}: Props) => {
  return (
    <>
      <FeedToggle globalFeed={global} />

      {articles.map((article) => (
        <ArticlePreview article={article} key={article.slug} />
      ))}

      {isLoading && <div className="article-preview">Loading articles...</div>}
      <div>
        <Pagination articlesCount={articlesCount} />
      </div>
    </>
  );
};

export default MainContent;
