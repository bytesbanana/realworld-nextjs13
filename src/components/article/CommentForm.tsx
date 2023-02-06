import { useSession } from "next-auth/react";
import React, { useState } from "react";

const CommentForm = ({
  onPostComment,
}: {
  onPostComment: (value: string) => void;
}) => {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  return (
    <form className="card comment-form">
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="card-footer">
        {session?.user?.image && (
          <img src={session?.user?.image} className="comment-author-img" />
        )}
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => {
            e.preventDefault();
            onPostComment(comment);
          }}
        >
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
