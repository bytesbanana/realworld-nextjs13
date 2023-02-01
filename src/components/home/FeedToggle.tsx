import { ArticleContext } from "contexts/ArticleContext";
import { PageContext } from "contexts/PageContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useContext } from "react";

const FeedToggle = () => {
  const { data: session } = useSession();
  // const feed = (router.query?.feed || "") as string;
  const {
    currentFeedType: feedType,
    setFeedType,
    selectedTag,
  } = useContext(ArticleContext);
  const { resetPage } = useContext(PageContext);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <>
          {session && (
            <li className="nav-item">
              <a
                className={`nav-link ${feedType === "YOUR" ? "active" : ""}`}
                href="#"
                onClick={() => {
                  setFeedType("YOUR");
                  resetPage();
                }}
              >
                Your Feed
              </a>
            </li>
          )}
          <li className="nav-item">
            <a
              className={`nav-link ${feedType === "GLOBAL" ? "active" : ""}`}
              href="#"
              onClick={() => {
                setFeedType("GLOBAL");
                resetPage();
              }}
            >
              Global Feed
            </a>
          </li>
        </>

        {feedType === "TAG" && (
          <li className="nav-item">
            <a className={`nav-link active`}>
              <i className="ion-pound" />
              {` ${selectedTag}`}
            </a>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
