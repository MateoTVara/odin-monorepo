import express from "express";
import cors from "cors";
import levelsRouter from "./levels/levels.router";
import errorMiddleware from "./errors/errors.middleware";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use("/levels", levelsRouter);

app.use(errorMiddleware);

app.listen(3000, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
  console.log("Server is running on port 3000");
});