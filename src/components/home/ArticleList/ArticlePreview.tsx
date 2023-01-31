import dayjs from "dayjs";
import { Article } from "lib/types/articles";
import { DEFAULT_USER_IMG_URL } from "lib/utils/constant";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler } from "react";

interface Props {
  article: Article;
}

const ArticlePreview = ({ article }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleToggleFavorite: MouseEventHandler = (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/auth/login");
      return;
    }
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link href={`/article/${article.slug}`}>
          <img
            src={article.author.image || DEFAULT_USER_IMG_URL}
            alt="author"
          />
        </Link>
        <div className="info">
          <Link href={`/profile/${article.author.username}`} className="author">
            {article.author.username}
          </Link>
          {/* <span className="date">January 20th</span> */}
          <span className="date">
            {dayjs(article.createdAt).format("MMMM DD, YYYY")}
          </span>
        </div>
        <button
          className={`btn btn-outline-primary btn-sm pull-xs-right ${
            article.favorited ? "active" : ""
          }`}
          onClick={handleToggleFavorite}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link href={`/artcle/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
};

export default ArticlePreview;
