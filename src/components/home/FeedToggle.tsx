import { ArticleContext } from "contexts/ArticleContext";
import { PageContext } from "contexts/PageContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const FeedToggle = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const feed = (router.query?.feed || "") as string;
  const { selectedTag, onSelectTag } = useContext(ArticleContext);
  const { resetPage } = useContext(PageContext);

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {session && (
          <li className="nav-item">
            <Link className="nav-link" href="?feed=your">
              Your Feed
            </Link>
          </li>
        )}
        <li className="nav-item">
          <Link
            className={`nav-link ${
              (!feed || feed === "global") && !selectedTag ? "active" : ""
            }`}
            href="?feed=global"
            onClick={(e) => {
              router.push({
                pathname: "/",
                query: {
                  feed: "global",
                },
              });
              onSelectTag(null);
              resetPage();
            }}
          >
            Global Feed
          </Link>
        </li>

        {selectedTag && (
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
