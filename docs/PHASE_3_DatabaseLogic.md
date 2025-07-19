# Phase 3: Create and Code - `lib/db.ts`

## Overview
This document details the creation and content of the `lib/db.ts` file, which is responsible for establishing the PostgreSQL database connection and handling the insertion of contact message data.

## File Creation and Content

### File Path
The file was created at `lib/db.ts` relative to the project root.

### Purpose
The `lib/db.ts` module serves as the dedicated backend database interaction layer for the contact form feature. Its primary purpose is to provide a robust and resilient function for persisting validated contact message submissions into the `contact_messages` table. By centralizing database logic here, the application maintains a clear separation of concerns and enhances maintainability.

### Content
The `lib/db.ts` file contains the following:

```typescript
import { Pool } from "pg";
import { TABLE_NAME } from "../config/constants";

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
```

### Key Components and Implementation Details

-   **`Pool` Instance**: A `pg.Pool` instance is defined at the module level. This ensures that the database connection pool is instantiated only once when the module is loaded, promoting efficient connection management and resource utilization. The connection string is sourced from `process.env.DATABASE_URL`.
-   **`insertContactMessage` Function**:
    -   **Signature**: `export async function insertContactMessage(name: string, email: string, message: string): Promise<void>`
    -   **Purpose**: This asynchronous function is responsible for inserting a new contact message record into the `contact_messages` table.
    -   **Parameterized Query**: It uses a parameterized SQL `INSERT` query (`$1`, `$2`, `$3`) to prevent SQL injection vulnerabilities, with the table name dynamically inserted from `TABLE_NAME` constant.
    -   **Error Handling**: Database errors are caught silently within a `try...catch` block. This design ensures that database failures do not propagate up the call stack, making the function robust and resilient, as per the requirements.
    -   **No Return Value**: The function returns `Promise<void>`, indicating that it does not return any data upon successful insertion.
    -   **No Side Effects (beyond database interaction)**: The function avoids any console output, logging, or other side effects, maintaining its purity as a database interaction layer.

### Constraints Adherence

-   **`TABLE_NAME` Usage**: The `TABLE_NAME` constant from `../config/constants.ts` is correctly used for the table name in the SQL query.
-   **Single `Pool` Instantiation**: The `Pool` is instantiated once at the module level.
-   **No Error Propagation**: Errors are caught and not re-thrown or logged.
-   **No Return Value**: The function returns `void`.
-   **No Console Output**: No `console.log` or similar statements are present.
-   **Limited Imports**: Only `pg` and `../config/constants` are imported.
-   **Valid TypeScript and ES Modules**: The file uses correct TypeScript syntax and ES module imports/exports.

## How it was Achieved
1.  **File Creation**: The `db.ts` file was created manually within the `lib` directory.
2.  **Content Population**: The specified TypeScript code, including the `Pool` instantiation and the `insertContactMessage` function, was directly written into the file.

## Next Steps
The `insertContactMessage` function is now ready to be imported and utilized by the API handler (`pages/api/contacts/POST.ts`) to persist contact form submissions into the database.
