import React from "react";
import type { Article } from "lib/types/articles";
import dayjs from "dayjs";
import Link from "next/link";

interface Props {
  article: Article;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
  onToggleFollow: () => void;
  onToggleFavorite: () => void;
}

const Actions = ({
  article,
  favorited,
  following,
  favoritesCount,
  onToggleFavorite,
  onToggleFollow,
}: Props) => {
  return (
    <div className="article-actions">
      <div className="article-meta">
        <Link href={"/profile/" + article.author.username}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link href={"/profile/" + article.author.username} className="author">
            {article.author.username}
          </Link>
          <span className="date">
            {dayjs(article.createdAt).format("MMMM DD, YYYY")}
          </span>
        </div>
        <button
          className={`btn btn-sm btn-${following ? "" : "outline-"}secondary`}
          onClick={onToggleFollow}
        >
          <i className="ion-plus-round"></i>
          &nbsp; {following ? "Unfollow" : "Follow"} {article.author.username}{" "}
        </button>
        &nbsp;
        <button
          className={`btn btn-sm btn-${!favorited ? "outline-" : ""}primary`}
          onClick={onToggleFavorite}
        >
          <i className="ion-heart"></i>
          &nbsp; {favorited ? "Unfavorite" : "Favorite"} Article{" "}
          <span className="counter">({favoritesCount})</span>
        </button>
      </div>
    </div>
  );
};

export default Actions;
