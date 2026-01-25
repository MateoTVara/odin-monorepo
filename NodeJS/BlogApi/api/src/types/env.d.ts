declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    LISTEN_PORT: string;
  }
}