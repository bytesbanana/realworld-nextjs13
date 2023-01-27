import dayjs from "dayjs";
import Link from "next/link";
import React, { useState } from "react";
import { Article } from "types/article";
import useSwr from "swr";
import storage from "fetcher/storage";
import { User } from "types/user";
import { API_BASE_URL } from "utils/constant";
import { ArticleResponse } from "types/response";

interface Props {
  article: Article;
}

export const ArticlePreview = ({ article }: Props) => {
  const { data: currentUser } = useSwr<User>("user", storage);

  const [favorited, setFavorited] = useState<boolean>(article.favorited)
  const [favoritesCount, setFavoritesCount] = useState<number>(article.favoritesCount)

  const toggleFavorite = async () => {

    const response = await fetch(`${API_BASE_URL}/articles/${article.slug}/favorite`, {
      method: favorited ? 'DELETE' : 'POST',
      headers: {
        'Authorization': 'Bearer ' + currentUser?.token
      }
    })

    if (response.ok) {
      setFavorited((isFav) => !isFav)
      setFavoritesCount((favCount) => {
        if (favorited) return favCount - 1
        return favCount + 1
      })
    }
  }

  return (
    <div className="article-preview" key={article.slug}>
      <div className="article-meta">
        <Link href={`/profile/${article.slug}`}>
          <img src={article.author?.image} />
        </Link>
        <div className="info">
          <Link href={"/profile/" + article.author.username} className="author">
            {article.author?.username}
          </Link>
          <span className="date">
            {dayjs(article.createdAt).format("MMMM D, YYYY")}
          </span>
        </div>
        <button className={`btn btn-outline-primary btn-sm pull-xs-right ${favorited ? "active" : ""}`} onClick={toggleFavorite}>
          <i className="ion-heart"></i> {favoritesCount}
        </button>
      </div>
      <Link
        href={currentUser ? "/article/" + article.slug : "/login"}
        className="preview-link"
      >
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
