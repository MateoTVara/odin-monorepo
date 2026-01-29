import { useEffect, useState } from 'react';
import type { PostPreview } from '../types';
import PostCard from '../components/PostCard';
import Header from '../components/Header';

const Homepage = () => {
  const [posts, setPosts] = useState<PostPreview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/posts/published');
        const data: PostPreview[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);

  return (
    <>
      <Header />
      <main
        className='
          min-h-screen
          dark:bg-gray-900
        '
      >
        <div className='
          grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))]
          justify-center justify-items-center gap-4 p-4
        '>
          {!loading && (posts && posts.length) && posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </>
  );
}

export default Homepage;