# Phase 6: Define SQL Schema Migration - `schema.sql`

## Overview
This document details the creation and content of the `schema.sql` file, which defines the raw SQL DDL for the `contact_messages` table. This file serves as a direct representation of the database schema, intended for manual execution or reference.

## File Creation and Content

### File Path
The file was created at `schema.sql` in the project root.

### Purpose
The `schema.sql` file provides a clean, unadorned SQL definition of the `contact_messages` table. Unlike ORM-generated migrations, this file is meant for direct manual execution against a PostgreSQL database. It serves as a clear, human-readable blueprint of the table structure, independent of any ORM-specific boilerplate or migration tracking.

### Content
The `schema.sql` file contains the following SQL DDL:

```sql
CREATE TABLE contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);
```

### Specifications Adherence

-   **Table Name**: The table name `contact_messages` exactly matches the `TABLE_NAME` constant defined in `config/constants.ts`.
-   **Column Definitions**:
    -   `id`: `SERIAL PRIMARY KEY` (auto-incrementing primary key).
    -   `name`: `TEXT NOT NULL`.
    -   `email`: `TEXT NOT NULL`.
    -   `message`: `TEXT NOT NULL`.
    -   `created_at`: `TIMESTAMP DEFAULT now()` (automatically sets the timestamp upon record creation).
-   **Minimal Structure**: The file includes only the specified columns and their types. No additional indexes, constraints, foreign keys, or extra fields were added.
-   **Clean SQL**: The SQL is presented without comments, ORM annotations, transaction wrappers, or migration boilerplate, making it suitable for direct manual execution.

## How it was Achieved
1.  **File Creation**: The `schema.sql` file was created manually in the project's root directory.
2.  **Content Population**: The specified SQL DDL was directly written into the file.

## Next Steps
The `schema.sql` file is now available for manual execution against a PostgreSQL database, providing a direct way to create the `contact_messages` table if `drizzle-kit push` is not used or for reference purposes.
