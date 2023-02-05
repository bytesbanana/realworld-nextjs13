import dayjs from "dayjs";
import ArticleAPI from "lib/api/article";
import { DEFAULT_USER_IMG_URL } from "lib/utils/constant";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { MouseEventHandler, useState } from "react";
import styles from "./ArticlePreview.module.css";

import type { Article } from "lib/types/articles";

interface Props {
  article: Article;
}

const ArticlePreview = ({ article }: Props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const [favCount, setFavCout] = useState(article.favoritesCount);
  const [isFav, setIsFav] = useState(article.favorited);

  const [isLoading, setIsLoading] = useState(false);

  const handleToggleFavorite: MouseEventHandler = async (e) => {
    e.preventDefault();
    if (!session) {
      router.push("/auth/login");
      return;
    }
    setIsLoading(true);

    const result = await ArticleAPI.setFavorite(
      article.slug,
      !isFav,
      session.accessToken
    );

    setIsLoading(false);

    if ("article" in result) {
      setFavCout(result.article.favoritesCount);
      setIsFav(result.article.favorited);
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
            isFav ? "active" : ""
          }`}
          onClick={handleToggleFavorite}
          disabled={isLoading}
        >
          <i
            className={`ion-heart ${isLoading ? styles.spin : ""}`}
            style={{ paddingRight: "2px" }}
          ></i>

          {favCount}
        </button>
      </div>
      <Link href={`/artcle/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>

        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
