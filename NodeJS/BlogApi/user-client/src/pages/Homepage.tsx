// user-client/src/pages/Homepage.tsx
import PostCard from '../components/PostCard';
import Header from '../components/Header';
import { usePosts } from '../hooks/posts/usePosts';

const Homepage = () => {

  const { data: posts, loading } = usePosts();

  return (
    <>
      <Header />
      <main
        className='
          min-h-[calc(100vh-4rem)]
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