import path from "node:path";
import fs from "node:fs";
import bcrypt from "bcryptjs";
import { Roles } from "../generated/prisma/enums";

const marunPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
const fabianPassword = await bcrypt.hash(process.env.USER1_PASSWORD, 10);
const marianaPassword = await bcrypt.hash(process.env.USER2_PASSWORD, 10);
const jazminPassword = await bcrypt.hash(process.env.USER3_PASSWORD, 10);
const luisPassword = await bcrypt.hash(process.env.USER4_PASSWORD, 10);

interface UserData {
  username: string;
  password: string;
  role?: Roles;
}

export const users: UserData[] = [
  {
    username: "marun",
    password: marunPassword,
    role: Roles.ADMIN,
  },
  {
    username: "phos",
    password: fabianPassword,
  },
  {
    username: "mariana",
    password: marianaPassword,
  },
  {
    username: "jazmin",
    password: jazminPassword,
  },
  {
    username: "luis",
    password: luisPassword,
  },
]





const postsDir = path.join(process.cwd(), "prisma/posts");

const [go, rust, typescript] = fs.readdirSync(postsDir).map(file => {
  const content = fs.readFileSync(`${postsDir}/${file}`, "utf-8");
  return content;
});

interface PostData {
  title: string;
  content: string;
  summary: string;
  published: boolean;
  authorId: number;
}

export const posts: PostData[] = [
  {
    title: "Go for Beginners",
    content: go,
    summary:
      "A beginner-friendly introduction to the Go programming language, covering its syntax, core concepts, tooling, and practical examples for building simple programs.",
    published: true,
    authorId: 1,
  },
  {
    title: "Rust programming language",
    content: rust,
    summary:
      "A comprehensive guide to the Rust programming language, focusing on ownership, borrowing, memory safety, and how Rust enables high-performance systems programming without a garbage collector.",
    published: true,
    authorId: 1,
  },
  {
    title: "Understanding TypeScript",
    content: typescript,
    summary:
      "An in-depth exploration of TypeScript, explaining its type system, tooling, and how it enhances JavaScript development by improving reliability, scalability, and maintainability.",
    published: true,
    authorId: 1,
  },
];





interface CommentData {
  content: string;
  postId: number;
  authorId: number;
}

export const comments: CommentData[] = [
  {
    content: "Great first post!",
    postId: 1,
    authorId: 2,
  },
  {
    content: "Thanks for sharing.",
    postId: 1,
    authorId: 1,
  },
  {
    content: "We are here not to do what's practical, but to do what's rusty",
    postId: 2,
    authorId: 3,
  },
  {
    content: "Looking forward to more posts.",
    postId: 3,
    authorId: 4,
  },
  {
    content: "TypeScript makes JavaScript less insufferable!",
    postId: 3,
    authorId: 5,
  }
];