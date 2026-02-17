declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    LISTEN_PORT: string;
    ACCESS_JWT_SECRET: string;
    REFRESH_JWT_SECRET: string;
    NODE_ENV: "development" | "production";
    ADMIN_PASSWORD: string;
    USER1_PASSWORD: string;
    USER2_PASSWORD: string;
    USER3_PASSWORD: string;
    USER4_PASSWORD: string;
  }
}