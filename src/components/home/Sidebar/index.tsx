import React from "react";
import TagList, { SelectTagFuncion } from "./TagList";

interface Props {
  tags: string[];
}

const Sidebar = ({ tags }: Props) => {
  return (
    <div className="sidebar">
      <TagList tags={tags} />
    </div>
  );
};

export default Sidebar;
