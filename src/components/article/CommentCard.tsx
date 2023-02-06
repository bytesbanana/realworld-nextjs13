import dayjs from "dayjs";
import Link from "next/link";
import React from "react";
import type { Comment } from "../../lib/types/comment";

interface Props {
  comment: Comment;
  onDeleteComment: (id: number) => void;
  enableDelete: boolean;
}

const CommentCard = ({ comment, onDeleteComment, enableDelete }: Props) => {
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          href={"/profile/" + comment.author.username}
          className="comment-author"
        >
          <img src={comment.author.image} className="comment-author-img" />
        </Link>
        &nbsp;
        <Link
          href={"/profile/" + comment.author.username}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">
          {dayjs(comment.createAt).format("MMMM DD, YYYY")}
        </span>
        {enableDelete && (
          <span className="mod-options">
            <i
              className="ion-trash-a"
              onClick={() => onDeleteComment(comment.id)}
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default CommentCard;
