import { config } from "dotenv";

config({
  path: `.env`,
});

export const { PORT, DB_URI, FRONTEND_URL } = process.env;
