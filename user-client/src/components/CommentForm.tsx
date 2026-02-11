// user-client/src/components/CommentForm.tsx
import { useState, type FormEvent } from "react"
import { commentsApi } from "../api/comments.api";
import type { FormError } from "../types/formError";
import type { Comment } from "../types";

type Props = {
  postId: number;
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
  setFormErrors: React.Dispatch<React.SetStateAction<FormError[]>>;
}

const CommentForm = ({ postId, setComments, setFormErrors } : Props) => {
  const [loadingCommentResponse, setLoadingCommentResponse] = useState<boolean>(false)

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadingCommentResponse(true);
    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      const newComment = await commentsApi.create({
        content: String(data.content),
        postId: Number(postId)
      });
      setComments(prev => [newComment,...prev]);
      form.reset();
    } catch (err) {
      if (err instanceof Error) {
        setFormErrors(prev => [
          { id: crypto.randomUUID(), message: err.message },
          ...prev,
        ]);
      }
    } finally {
      setLoadingCommentResponse(false);
    }
  }

  return (
    <>
      <h2>Comments</h2>

      <div>
        <form
          onSubmit={handleCommentSubmit}
          className="
            flex flex-col gap-4
          "
        >
          <textarea
            name="content"
            id="content"
            placeholder="Write your comment here..."
            cols={30} rows={5}
            className="
              p-2 rounded
              bg-gray-100 dark:bg-gray-800
            "
          />
          <button
            type="submit"
            disabled={loadingCommentResponse}
            className={`
              self-end px-4 py-2
              bg-blue-500 text-white rounded
              hover:bg-blue-600

              ${loadingCommentResponse ? "cursor-not-allowed opacity-50" : ""}
            `}
          >
            {loadingCommentResponse ? "Posting..." : "Post"}
          </button>
        </form>
      </div>
    </>
  )
}

export default CommentForm;