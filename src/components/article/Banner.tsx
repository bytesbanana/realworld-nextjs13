import dayjs from "dayjs";
import { Article } from "lib/types/articles";

interface Props {
  article: Article;
  following: boolean;
  favorited: boolean;
  favoritesCount: number;
  onToggleFollow: () => void;
  onToggleFavorite: () => void;
}
const Banner = ({
  article,
  following,
  favorited,
  favoritesCount,
  onToggleFollow,
  onToggleFavorite,
}: Props) => {
  const renderFollowButton = () => {
    return (
      <button
        className={`btn btn-sm btn-${following ? "" : "outline-"}secondary`}
        onClick={onToggleFollow}
      >
        <i className="ion-plus-round"></i>
        &nbsp; {following ? "Unfollow" : "Follow"} {article.author.username}{" "}
      </button>
    );
  };

  const renderFavoriteButton = () => {
    return (
      <button
        className={`btn btn-sm btn-${!favorited ? "outline-" : ""}primary`}
        onClick={onToggleFavorite}
      >
        <i className="ion-heart"></i>
        &nbsp; {favorited ? "Unfavorite" : "Favorite"} Article{" "}
        <span className="counter">({favoritesCount})</span>
      </button>
    );
  };

  return (
    <div className="banner">
      <div className="container">
        <h1>{article?.title}</h1>

        <div className="article-meta">
          <a href="">
            <img src={article.author.image} alt={article.author.username} />
          </a>
          <div className="info">
            <a href="" className="author">
              {article.author.username}
            </a>
            <span className="date">
              {dayjs(article.createdAt).format("MMMM DD, YYYY")}
            </span>
          </div>
          {renderFollowButton()}
          &nbsp;&nbsp;
          {renderFavoriteButton()}
        </div>
      </div>
    </div>
  );
};

export default Banner;
