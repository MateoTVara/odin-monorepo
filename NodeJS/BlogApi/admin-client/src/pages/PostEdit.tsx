import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import type { PostDetail } from '../types/post';
import postsApi from '../api/posts.api';
import Header from '../components/Header';
import PostForm from '../components/PostForm';

const PostEdit = () => {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false); 

  const params = useParams<{ postId: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        if (params.postId) {
          const post = await postsApi.fetchById(params.postId);
          setPost(post);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.postId]);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post || !params.postId) return;
    try {
      setSending(true);
      await postsApi.editById(params.postId, {
        title: post.title,
        content: post.content,
        published: post.published,
      });
      alert('Post updated successfully!');
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Failed to update post. Please try again.');
    } finally {
      setSending(false);
    }
  }

  if (loading) { return <div>Loading...</div> }

  return (
    <>
      <Header />
      <PostForm
        post={post}
        setPost={setPost}
        onSubmit={handleSubmit}
        isSubmitting={sending}
        submitLabel="Save Changes"
      >
      <div className="text-sm text-gray-500">
        <div>Created at: {post && new Date(post.createdAt).toLocaleDateString()}</div>
        <div>Last updated: {post && new Date(post.updatedAt).toLocaleDateString()}</div>
      </div>
      </PostForm>
    </>
  )
}

export default PostEdit;