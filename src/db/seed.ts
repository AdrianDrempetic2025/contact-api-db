import { db } from "@/src/db/client";
import { contactMessages } from "@/src/db/schema";
import { eq } from "drizzle-orm";

async function main() {
  // Optional: Clear the table before inserting (safe in dev only)
  // In a real application, you might want to add a check for NODE_ENV === 'development'
  // or use a specific command-line flag to enable this.
  try {
    console.log("Clearing contactMessages table...");
    await db.delete(contactMessages);
    console.log("Table cleared.");
  } catch (error) {
    console.error("Error clearing table:", error);
    // Decide if you want to exit or continue if clearing fails
    // For seeding, it might be acceptable to continue if clearing fails but insertion is still possible.
    // However, for safety, we'll exit if clearing fails.
    process.exit(1);
  }

  // Insert example records
  try {
    console.log("Inserting seed data...");
    await db.insert(contactMessages).values([
      {
        name: "John Doe",
        email: "john.doe@example.com",
        message: "Hello, this is a test message from John Doe.",
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        message: "This is Jane's message, testing the seeding script.",
      },
      {
        name: "Test User",
        email: "test.user@example.com",
        message: "Another test message.",
      },
    ]);
    console.log("Seeded!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

main();
