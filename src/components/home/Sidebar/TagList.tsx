import { ArticleContext } from "contexts/ArticleContext";
import { PageContext } from "contexts/PageContext";
import React, { useContext } from "react";

export type SelectTagFuncion = (tag: string) => void;

interface Props {
  tags: string[];
}

const TagList = ({ tags }: Props) => {
  const { onSelectTag } = useContext(ArticleContext);
  const { resetPage } = useContext(PageContext);

  return (
    <>
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags &&
          tags.map((tag) => (
            <a
              className="tag-pill tag-default"
              key={tag}
              onClick={(e) => {
                e.preventDefault();
                onSelectTag(tag);
                resetPage();
              }}
            >
              {tag}
            </a>
          ))}
      </div>
    </>
  );
};

export default TagList;
