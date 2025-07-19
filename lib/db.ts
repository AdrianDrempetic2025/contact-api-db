import { Pool } from "pg";
import { TABLE_NAME } from "../config/constants";

// Enforce DATABASE_URL existence check
if (!process.env.DATABASE_URL || process.env.DATABASE_URL.trim() === '') {
  throw new Error("DATABASE_URL is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function insertContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  try {
    await pool.query(
      `INSERT INTO ${TABLE_NAME} (name, email, message) VALUES ($1, $2, $3)`,
      [name, email, message]
    );
  } catch (_) {
    // Do nothing — errors are silently caught
  }
}
