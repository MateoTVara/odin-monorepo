import express from "express";
import cors from "cors";
import levelsRouter from "./levels/levels.router";

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: [
    "http://localhost:5173"
  ],
  credentials: true,
}));

app.use("/levels", levelsRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});