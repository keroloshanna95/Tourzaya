import dotenv from "dotenv";

dotenv.config();

if (!process.env.PORT || !process.env.DB_URI || !process.env.JWT_SECRET || !process.env.JWT_EXPIRES_IN) {
  console.log("Missing required environment variables");
}

export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI;
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';
