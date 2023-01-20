import storage from "fetcher/storage";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { StorageUser } from "types/user";

type Props = {
  globalFeed: boolean;
  currentTag?: string;
};

const defaultProps: Props = {
  globalFeed: true,
  currentTag: undefined,
};

const FeedToggle = (props: Props = defaultProps) => {
  const {data: currentUser} = useSWR<StorageUser>('user', storage)

  return (
    <div className="feed-toggle">
      <ul className="nav nav-pills outline-active">
        {currentUser && <li className="nav-item">
          <Link
            className={`nav-link ${props.globalFeed ? "" : "active"}`}
            href="?global=false"
            shallow
          >
            Your Feed
          </Link>
        </li>}
        <li className="nav-item">
          <Link
            className={`nav-link ${!props.globalFeed ? "" : "active"}`}
            href="?global=true"
            shallow
          >
            Global Feed
          </Link>
        </li>

        {props.currentTag && (
          <li className="nav-item">
            <Link
              className={`nav-link ${!props.globalFeed ? "" : "active"}`}
              href="?global=true"
              shallow
            >
              # {props.currentTag}
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default FeedToggle;
