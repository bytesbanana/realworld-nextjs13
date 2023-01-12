import Link from "next/link";
import React, { useState } from "react";
import { Article } from "types";

type Props = {
  articles: Article[];
  articlesCount: number;
};

type Paginate = {
  offset: number;
  currentPage: number;
  limit: number;
};

const Pagination = ({ articles, articlesCount }: Props) => {
  const [pagination, setPagination] = useState<Paginate>({
    offset: 0,
    currentPage: 1,
    limit: 10,
  });

  return (
    <nav>
      <ul className="pagination">
        {articlesCount &&
          new Array(parseInt((articlesCount / pagination.limit).toString()) + 1)
            .fill(0)
            .map((_, n) => (
              <li
                className={`page-item ${
                  pagination.currentPage == n + 1 ? "active" : ""
                }`}
                key={`page${n}`}
              >
                <Link
                  className={`page-link `}
                  href=""
                  shallow
                  onClick={() => {
                    setPagination((prev) => ({
                      ...prev,
                      currentPage: n + 1,
                    }));
                  }}
                >
                  {n + 1}
                </Link>
              </li>
            ))}
      </ul>
    </nav>
  );
};

export default Pagination;
