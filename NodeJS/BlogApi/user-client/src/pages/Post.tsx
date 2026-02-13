// user-client/src/pages/Post.tsx
import { useParams } from "react-router";
import NotFound from "./NotFound";
import Header from "../components/Header";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePost } from "../hooks/posts/usePost";
import { useEffect, useState} from "react";
import type { FormError } from "../types/formError";
import type { Comment } from "../types";
import CommentItem from "../components/CommentItem";
import ErrorNotification from "../components/ErrorNotification";
import CommentForm from "../components/CommentForm";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const { data: post, loading, error } = usePost(Number(id) || null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [formErrors, setFormErrors] = useState<FormError[]>([]);

  useEffect(() => {
    if (post) setComments(post.comments);
  }, [post]);

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
      {formErrors.length > 0 && (
        <div className="fixed top-20 right-4 z-50 w-fit flex flex-col-reverse gap-1">
          {formErrors.map(error => (
            <ErrorNotification
              key={error.id}
              id={error.id}
              message={error.message}
              setFormErrors={setFormErrors}
            />
          ))}
        </div>
      )}
      <main
        className="
          w-full max-w-none min-h-[calc(100vh-4rem)]
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

        <CommentForm
          postId={Number(id)}
          setComments={setComments}
          setFormErrors={setFormErrors}
        />

        <div className="flex flex-col gap-3 mt-4">
          {comments.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Post;