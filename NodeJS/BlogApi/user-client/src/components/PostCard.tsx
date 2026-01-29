import {  Link } from 'react-router';
import type { PostPreview } from '../types';
import { useRef, useState } from 'react';

const PostCard = ({ post }: { post: PostPreview }) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!divRef.current) return;
    const bounds = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - bounds.left, y: e.clientY - bounds.top });
  }

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      className="
        relative rounded-xl p-0.5 backdrop-blur-md overflow-hidden shadow-lg max-w-md w-full
      "
    >
      {visible && (
        <div
          className="
            pointer-events-none blur-xl bg-linear-to-r
            size-60 absolute z-0 transition-opacity duration-300
            from-gray-400 via-gray-700 to-gray-900
            dark:from-gray-500 dark:via-gray-300 dark:to-gray-100
          "
          style={{ top: position.y - 120, left: position.x - 120,}}
        />
      )}

      <div
        className="
          flex flex-col items-start
          h-full relative z-10 p-6 rounded-[10px]
          bg-white
          dark:bg-gray-800 dark:text-white
        "
      >
        <h2
          className='
            font-bold text-xl
          '
        >
          {post.title}
        </h2>
        <p className="line-clamp-4 overflow-hidden">
          {post.content}
        </p>
        <Link
          className='font-semibold mt-auto'
          to={`/posts/${post.id}`}
        >
          <span
            className='
              text-gray-600
              dark:text-gray-400
            '
          >
            ➜
          </span> Read more
        </Link> 
      </div>
    </div>
  )
};

export default PostCard;