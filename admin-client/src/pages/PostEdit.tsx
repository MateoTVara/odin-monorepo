import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import type { PostDetail } from '../types/post';
import postsApi from '../api/posts.api';
import Header from '../components/Header';

const PostEdit = () => {
  const [post, setPost] = useState<PostDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false); 

  const params = useParams<{ postId: string }>();

  const editorRef = useRef<Editor>(null);

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
      {post ? (
        <div className="container mx-auto px-4 py-8">
          <form
            onSubmit={handleSubmit}
            className="mb-6 flex items-center justify-between"
          >
            <h1
              className="text-3xl font-bold"
            >
              <input
                type="text"
                value={post.title || ''}
                onChange={(e) => setPost(prev => prev ? { ...prev, title: e.target.value } : prev)}
                className="bg-transparent border-none focus:outline-none focus:ring-0"
              />
              <div className="text-sm text-gray-500">Created at: {new Date(post.createdAt).toLocaleDateString()}</div>
              <div className="text-sm text-gray-500">Last updated: {new Date(post.updatedAt).toLocaleDateString()}</div>
            </h1>
            <div
              className="flex items-center gap-4"
            >
              <div
                className="flex items-center gap-1"
              >
                <label htmlFor="published">Published</label>
                <input
                  type="checkbox"
                  id="published"
                  checked={post.published}
                  onChange={(e) => setPost(prev => prev ? { ...prev, published: e.target.checked } : prev)}
                />
              </div>
              <button
                type="submit"
                className={`
                rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700
                ${sending ? 'cursor-not-allowed opacity-50' : ''}
                `}
              >
                {sending ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
          <Editor
            ref={editorRef}
            initialValue={post.content || ''}
            previewStyle="vertical"
            height="768px"
            initialEditType="markdown"
            usageStatistics={false}
            onChange={() => {
              const content = editorRef.current?.getInstance().getMarkdown() || '';
              setPost((prev) => prev ? { ...prev, content } : prev);
            }}
          />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-4">Post not found</h1>
        </div>
      )}
    </>
  )
}

export default PostEdit;