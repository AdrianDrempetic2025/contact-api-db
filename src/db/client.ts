import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { contactMessages } from '@/src/db/schema'; // Added import for contactMessages
import { env } from "@/src/lib/env";

const client = new Pool({ // Corrected Client to client
  connectionString: env.DATABASE_URL,
});

(async () => {
  await client.connect();
})(); // Connect the client

export const db = drizzle(client); // Export the drizzle instance

export async function insertContactMessage(
  name: string,
  email: string,
  message: string
): Promise<void> {
  try {
    await db.insert(contactMessages).values({ name, email, message }).execute(); // Use db instance and correct table name
  } catch (_) {
    // Do nothing — errors are silently caught
  }
}
