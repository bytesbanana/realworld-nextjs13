import { PageContext } from "contexts/PageContext";
import React, { useContext } from "react";

interface Props {
  active?: boolean;
  number: number;
}

const initProps: Props = {
  active: false,
  number: 0,
};

const PaginationListItem = ({ active, number } = initProps) => {
  const { setPageIndex } = useContext(PageContext);

  return (
    <li className={`page-item ${active ? "active" : ""}`}>
      <a
        className="page-link "
        onClick={(e) => {
          e.preventDefault();
          setPageIndex(number);
        }}
        href=""
      >
        {number}
      </a>
    </li>
  );
};

export default PaginationListItem;
