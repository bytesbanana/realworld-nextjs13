import { ProfileContext } from "contexts/ProfileContex";
import { useSession } from "next-auth/react";
import React, { useContext } from "react";

const ArticleToggle = () => {
  const { articleType, setArticleType } = useContext(ProfileContext);

  return (
    <div className="articles-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <a
            className={`nav-link ${
              articleType === "MY_ARTICLES" ? "active" : ""
            }`}
            href="#"
            onClick={() => setArticleType("MY_ARTICLES")}
          >
            My Articles
          </a>
        </li>
        <li className="nav-item">
          <a
            className={`nav-link ${
              articleType === "FAVORITE_ARTICLES" ? "active" : ""
            }`}
            href="#"
            onClick={() => setArticleType("FAVORITE_ARTICLES")}
          >
            Favorited Articles
          </a>
        </li>
      </ul>
    </div>
  );
};

export default ArticleToggle;
