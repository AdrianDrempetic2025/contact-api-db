import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { contactMessages } from '@/db/schema';
import { env } from "@/lib/env";

// Create DB connection pool
const client = new Pool({
  connectionString: env.DATABASE_URL,
});

// Let drizzle handle the pool lifecycle
export const db = drizzle(client);

// Insert contact message into DB
export async function insertContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  try {
    await db.insert(contactMessages).values({ name, email, message }).execute(); // Use db instance and correct table name
  } catch (err) {
    console.error("Failed to insert contact message:", err);
    throw Object.assign(new Error("Internal database error"), { status: 500 });
  }
}
