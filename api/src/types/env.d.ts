export {};

declare global { 
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NODE_ENV: "development" | "production" | "test";
      PORT: string;
      CORS_ORIGIN: string;
    }
  }
}