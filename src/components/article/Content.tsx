import React from "react";
import ReactMarkdown from "react-markdown";

const Content = ({ body }: { body: string }) => {
  return (
    <div className="row article-content">
      <div className="col-md-12">
        <ReactMarkdown>{body}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Content;
