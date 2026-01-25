import express from 'express';

const app = express();

app.listen(parseInt(process.env.LISTEN_PORT), '0.0.0.0', (err: Error | undefined) => {
  if (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
  console.log(`Server is listening on port ${process.env.LISTEN_PORT}`);
});