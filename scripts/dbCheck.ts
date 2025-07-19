import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import "dotenv/config";

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  await client.connect();
  const db = drizzle(client);
  console.log("✅ Connected to PostgreSQL via Drizzle");
  await client.end();
})();
