import React, { useState } from "react";
import Header from "../components/Header";
import PostForm from "../components/PostForm";
import type { PostDetail } from "../types/post";
import postsApi from "../api/posts.api";
import { useNavigate } from "react-router";

const PostCreate = () => {
  const initialContent = `# Hello World!

This is your first post. You can edit or delete it, and start writing your own posts!

- Use the title field to set the title of your post.
- Use the content area to write the body of your post. You can use Markdown syntax for formatting.
- Toggle the "Published" switch to set whether the post is published or not.
- Click "Create Post" when you're ready to save your new post.

Happy blogging!`;

  const [post, setPost] = useState<PostDetail | null>({
    title: '',
    content: initialContent,
    published: false,
    summary: 'placeholder summary',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [isSending, setIsSending] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!post) return;
    try {
      setIsSending(true);
      await postsApi.create(post);
      navigate('/');
    } catch (error) {
      console.error('Error creating post:', error);
      alert(`${error instanceof Error ? error.message : 'Failed to create post. Please try again.'}`);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <>
      <Header />
      <PostForm 
        post={post}
        setPost={setPost}
        onSubmit={handleSubmit}
        isSubmitting={isSending}
        submitLabel="Create Post"
      />
    </>
  )
}

export default PostCreate;