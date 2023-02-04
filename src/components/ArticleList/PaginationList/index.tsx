import React from "react";
import PaginationListItem from "./PaginationListItem";

interface Props {
  pageIndex: number;
  totalPages: number;
}
const PaginationList = ({ pageIndex, totalPages }: Props) => {
  return (
    <nav>
      <ul className="pagination">
        {totalPages > 1 &&
          new Array(parseInt(Math.ceil(totalPages) + "", 10))
            .fill(0)
            .map((_, n) => (
              <PaginationListItem
                active={n + 1 === pageIndex}
                number={n + 1}
                key={`page-${n}`}
              />
            ))}
      </ul>
    </nav>
  );
};

export default PaginationList;
