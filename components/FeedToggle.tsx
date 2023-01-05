import Link from "next/link";
import React from "react";

type FeedToggleProps = {
  globalFeed: boolean;
};

export function FeedToggle(props: FeedToggleProps) {
  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        <li className="nav-item">
          <Link
            className={`nav-link ${props.globalFeed ? "" : "active"}`}
            href=""
            shallow
          >
            Your Feed
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={`nav-link ${!props.globalFeed ? "" : "active"}`}
            href="?global=true"
            shallow
          >
            Global Feed
          </Link>
        </li>
      </ul>
    </div>
  );
}
