declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    LISTEN_PORT: string;
    JWT_SECRET: string;
    ADMIN_PASSWORD: string;
    USER1_PASSWORD: string;
    USER2_PASSWORD: string;
    USER3_PASSWORD: string;
    USER4_PASSWORD: string;
  }
}