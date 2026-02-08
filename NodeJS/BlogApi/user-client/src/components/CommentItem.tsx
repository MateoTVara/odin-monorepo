import type { Comment } from "../types";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div
      className="
        flex flex-col gap-1
        rounded-lg
        text-sm
        border-b-gray-300 dark:border-b-gray-600
        border-b-2
        px-4 py-2
        bg-gray-100 dark:bg-gray-800
      "
    >
      <div className="flex items-center justify-between">
        <span className="font-semibold text-xl text-gray-900 dark:text-gray-100">
          {comment.author.username}
        </span>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {new Date(comment.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className=" text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
        {comment.content}
      </p>
    </div>
  );
};

export default CommentItem;
