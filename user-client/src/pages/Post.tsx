// user-client/src/pages/Post.tsx
import { useParams } from "react-router";
import NotFound from "./NotFound";
import Header from "../components/Header";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { usePost } from "../hooks/posts/usePost";

const Post = () => {
  const { id } = useParams<{ id: string }>();

  // const [post, setPost] = useState<PostDetail | null>(null);
  // const [loading, setLoading] = useState(true);
  const { data: post, loading, error } = usePost(Number(id) || null);

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
    // <>
    //   {loading ? (
    //     <>
    //       <Header />
    //       <div>Loading...</div>
    //     </>
    //   ) : post && post.author ? (
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
        <div>
          {post.comments.map((comment) => (
            <div key={comment.id}>
              <div>{comment.author.username}</div>
              <div>{comment.content}</div>
              <div>{comment.createdAt.toString()}</div>
            </div>
          ))}
        </div>
      </main>
    </>
    //   ) : (
    //     <NotFound />
    //   )}
    // </>
  );
}

export default Post;