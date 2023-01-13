import { usePagination } from "contexts/PaginationContex";
import Link from "next/link";

type Props = {
  articlesCount: number;
};

const Pagination = ({ articlesCount }: Props) => {
  const { setPagination, ...pagination } = usePagination();

  return (
    <nav>
      <ul className="pagination">
        {articlesCount > 0 &&
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
                    setPagination({
                      ...pagination,
                      currentPage: n + 1,
                      offset: pagination.limit * n,
                    });
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
