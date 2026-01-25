import { useEffect, useState } from 'react'
import './App.css'
import type { Comment, Post } from './types';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const response = await fetch('http://localhost:3000/posts/published');
      const data = await response.json();
      setPosts(data);
      setLoading(false);
      console.log(data);
    }
    fetchPosts();
  }, []);

  return (
    <div>
      {!loading && (posts && posts.length) && posts.map((post: Post) => (
        <div
          key={post.id}
          className='border-b-1'
        >
          <h2>{post.title}</h2>
          <p>{post.content}</p>
          <p>{post.createdAt.toString()}</p>
          {post.comments.length && (
            <ul className='flex flex-col gap-1 pl-5'>
              {post.comments.map((comment: Comment) => (
                <li
                  key={comment.id}
                  className='border-1 p-2'
                >
                  <p>{comment.content}</p>
                  <p>{comment.createdAt.toString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
        ))
      }
    </div>
  );
}

export default App