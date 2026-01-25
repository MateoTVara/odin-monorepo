import type { Request, Response, NextFunction } from 'express';
import { commentsRouter, postsRouter } from './routes';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Dev user client origin
}))

// Wireup routes
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Error handling middleware
app.use((
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error('An error occurred:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(parseInt(process.env.LISTEN_PORT), '0.0.0.0', (err: Error | undefined) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on port ${process.env.LISTEN_PORT}`);
});