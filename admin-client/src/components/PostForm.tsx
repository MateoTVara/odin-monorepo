import '@toast-ui/editor/dist/toastui-editor.css';
import { useRef, type Dispatch, type SetStateAction } from "react";
import { Editor } from "@toast-ui/react-editor";
import type { PostDetail } from "../types/post";

interface Props {
  post: PostDetail | null;
  setPost: Dispatch<SetStateAction<PostDetail | null>>;
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  submitLabel: string;
  children?: React.ReactNode;
}

const PostForm = ({
  post,
  setPost,
  onSubmit,
  isSubmitting,
  submitLabel,
  children,
}: Props) => {
  const editorRef = useRef<Editor>(null);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Post not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <form
        onSubmit={onSubmit}
        className="mb-6 flex items-center justify-between"
      >
        <h1
          className="text-3xl font-bold border-b border-gray-300 pb-2 flex items-center gap-4"
        >
          <input
            type="text"
            value={post.title || ''}
            onChange={(e) => setPost(prev => prev ? { ...prev, title: e.target.value } : prev)}
            className="bg-transparent border-none focus:outline-none focus:ring-0"
          />
          {children}
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
            ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            {isSubmitting ? 'Saving...' : submitLabel}
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
          setPost(prev => prev ? { ...prev, content } : prev);
        }}
      />
    </div>
  );
}

export default PostForm;