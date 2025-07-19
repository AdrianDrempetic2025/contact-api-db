import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  migrations: {
    schema: "public", // Explicitly set schema for migrations
  },
  verbose: true, // Enable verbose logging
  strict: true,  // Enable strict mode for push
});
