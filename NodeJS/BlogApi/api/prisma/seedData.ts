import path from "node:path";
import fs from "node:fs";

const postsDir = path.join(process.cwd(), "prisma/posts");

const postsContents = fs.readdirSync(postsDir).map(file => {
  const content = fs.readFileSync(`${postsDir}/${file}`, "utf-8");
  return content;
});

interface PostData {
  title: string;
  content: string;
  published: boolean;
  authorId: number;
}

export const posts: Record<string, PostData> = {
  post1: {
    title: "Go for Beginners",
    content: postsContents[0],
    published: true,
    authorId: 1,
  },
  post2: {
    title: "Rust programming language",
    content: postsContents[1],
    published: true,
    authorId: 1,
  },
  post3: {
    title: "Understanding TypeScript",
    content: postsContents[2],
    published: true,
    authorId: 1,
  },
};