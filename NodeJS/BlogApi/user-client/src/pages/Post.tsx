// user-client/src/pages/Post.tsx
import { useParams } from "react-router";
import NotFound from "./NotFound";
import Header from "../components/Header";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePost } from "../hooks/posts/usePost";
import { useEffect, useState, type FormEvent } from "react";
import { commentsApi } from "../api/comments.api";
import type { Comment } from "../types";
import CommentItem from "../components/CommentItem";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, loading, error } = usePost(Number(id) || null);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (post) setComments(post.comments);
  }, [post]);

  const handleCommentSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    const newComment = await commentsApi.create({
      content: String(data.content),
      postId: Number(id)
    });

    setComments(prev => [newComment,...prev]);
    form.reset();
  }

  if (loading) return (
    <>
      <Header />
      <div>Loading...</div>
    </>
  )

  if (error || !post) return (
    <NotFound />
  )

  return (
    <>
      <Header />
      <main
        className="
          w-full max-w-none
          px-4 py-8
          xl:px-32 xl:py-16
          dark:bg-gray-900
          prose dark:prose-invert
        "
      >
        <h1
          className="
            text-5xl font-bold mb-4
            xl:text-6xl
            dark:text-white
          "
        >
          {post.title}
        </h1>
        <div
          className="
            text-lg
            dark:text-gray-300
          "
        >
          By {post.author.username} on {new Date(post.createdAt).toLocaleDateString()}
        </div>
        <div
          className="
            text-sm mb-6
            italic
            dark:text-gray-400
          "
        >
          Last updated: {new Date(post.updatedAt).toLocaleDateString()}
        </div>
        <Markdown
          children={post.content}
          components={{
            code({ children, className }) {
              const match = /language-(\w+)/.exec(className || '');
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={vscDarkPlus}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>
                  {children}
                </code>
              );
            }
          }}
        />

        <div
          className="
            flex flex-col
          "
        >
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
                className="
                  self-end
                  px-4 py-2
                  bg-blue-500 text-white rounded
                  hover:bg-blue-600
                "
              >
                Submit
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3 mt-4">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default Post;