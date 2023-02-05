import { KEYS } from "lib/utils/constant";
import React, { useEffect, useRef, useState } from "react";
import type { KeyboardEventHandler } from "react";

interface Props {
  initTags?: string[];
  onTagListChange: (tagList: string[]) => void;
}

const TagsInput = ({ initTags, onTagListChange }: Props) => {
  const [tagList, setTaglist] = useState<string[]>(initTags || []);
  const [tag, setTag] = useState("");

  const handleKeyboardEvent: KeyboardEventHandler = (e) => {
    if (e.key === KEYS.ENTER && tag.length > 0) {
      if (tagList.indexOf(tag) === -1) {
        e.preventDefault();

        const updatedTagList = [...tagList, tag];
        setTaglist(updatedTagList);
        onTagListChange(updatedTagList);
        setTag("");
      }
    }
  };

  const handleDeleteTag = (tag: string) => {
    const updatedTagList = tagList.filter((t) => t != tag);
    setTaglist(updatedTagList);
    onTagListChange(updatedTagList);
  };

  return (
    <>
      <input
        type="text"
        className="form-control"
        placeholder="Enter tags"
        id="tagList"
        name="tagList"
        onKeyDown={handleKeyboardEvent}
        onChange={(e) => setTag(e.target.value)}
        value={tag}
      />
      <div className="tag-list">
        {tagList.map((tag, i) => (
          <span className="tag-default tag-pill" key={`tag${i}`}>
            <i
              className="ion-close-round"
              onClick={(e) => handleDeleteTag(tag)}
            />{" "}
            {tag}
          </span>
        ))}
      </div>
    </>
  );
};

export default TagsInput;
