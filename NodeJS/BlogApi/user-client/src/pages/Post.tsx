import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { PostDetail } from "../types";
import NotFound from "./NotFound";
import Header from "../components/Header";

const Post = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function fetchPost() {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:3000/posts/published/${id}`);
        const post: PostDetail = await response.json();
        setPost(post);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <>
      {loading ? (
        <>
          <Header />
          <div>Loading...</div>
        </>
      ) : post && post.author ? (
        <>
          <Header />
          <main>
            <div>{post.author.username}</div>
            <div>{post.title}</div>
            <div>{post.content}</div>
            <div>{post.createdAt.toString()}</div>
            <div>{post.updatedAt.toString()}</div>
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
      ) : (
        <NotFound />
      )}
    </>
  );
}

export default Post;