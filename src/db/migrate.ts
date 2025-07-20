import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "@/src/db/client"; // Assuming db is exported from client.ts

async function main() {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migrations applied successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error applying migrations:", error);
    process.exit(1);
  }
}

main();
