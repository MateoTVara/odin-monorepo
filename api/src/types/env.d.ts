declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    LISTEN_PORT: string;
    JWT_SECRET: string;
    ADMIN_PASSWORD: string;
    USER_PASSWORD: string;
  }
}