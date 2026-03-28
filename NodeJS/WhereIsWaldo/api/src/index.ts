import express from "express";
import cors from "cors";
import levelsRouter from "./levels/levels.router";
import errorMiddleware from "./errors/errors.middleware";
import cookieParser from "cookie-parser";
import { randomUUID } from "node:crypto";
import runsRouter from "./runs/runs.router";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  let sessionId = req.cookies.session_id;

  if (!sessionId) {
    sessionId = randomUUID();

    res.cookie("session_id", sessionId, {
      httpOnly: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
  }

  req.sessionId = sessionId;
  next();
});

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use("/levels", levelsRouter);
app.use("/runs", runsRouter);

app.use(errorMiddleware);

app.listen(3000, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log("Server is running on port 3000");
});