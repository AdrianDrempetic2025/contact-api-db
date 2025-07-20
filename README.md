# 📬 Contact Form API — Backend Endpoint

## 🧭 Overview

This project implements a secure, minimal, and fully testable **REST API endpoint** for accepting contact form submissions. The API receives `POST` requests at `/api/contact`, performs strict validation, and stores the messages in a PostgreSQL database using a modern, type-safe ORM.

The application is built with a modular architecture leveraging Next.js API routes (or app router), TypeScript, Zod for schema validation, and Drizzle ORM for database interaction. It emphasizes clean separation of concerns, robust error handling, and maintainability.

---

## 📦 Features

- Strict input validation using Zod schemas (name, email, message)
- Flat relational database model (PostgreSQL) with a single `contact_messages` table
- Type-safe database queries and schema definitions using Drizzle ORM
- Modular service layer for business logic and validation
- Centralized error mapping for consistent API responses
- Environment-based DB connection via `.env`
- Comprehensive testing support: unit, integration, and end-to-end tests
- Enforced code quality with ESLint, Prettier, Commitlint, and Husky hooks
- Migration and seed scripts for database schema management and development data

---

## 🚀 API Specification

**Endpoint:**  
`POST /api/contact`

**Required Headers:**  
`Content-Type: application/json`

**Request Body:**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "message": "Hello, this is a test message longer than 20 characters."
}
```

**Success Response:**

```json
{ "id": 123 }
```

The response returns the unique ID of the newly created contact message record.

**Validation Error Response:**

```json
{
  "status": 400,
  "message": "Validation failed",
  "issues": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    },
    {
      "path": ["message"],
      "message": "Message must be at least 20 characters"
    }
  ]
}
```

**Conflict Error Response:**

```json
{
  "status": 409,
  "message": "Email already exists"
}
```

---

## 🛡 Validation Rules

- `name`: Required, must be a non-empty string
- `email`: Required, must be a valid email format (validated with regex and Zod)
- `message`: Required, minimum 20 characters

Validation is performed using Zod schemas in the service layer, ensuring type safety and detailed error reporting.

---

## 🧱 Database Schema

PostgreSQL is used with a single table defined via Drizzle ORM:

```typescript
export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 254 }).notNull().unique(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

The schema enforces constraints such as unique email and field length limits aligned with validation rules.

---

## 🛠 Setup & Development

### 1. Clone the repo and install dependencies

```bash
git clone <your-repo>
cd contact-api
pnpm install
```

### 2. Create `.env` file

Create a `.env` file in the project root with the following content:

```
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/contact_form_db
```

### 3. Set up PostgreSQL

If not already done, create the database and user with appropriate privileges:

```sql
CREATE DATABASE contact_form_db;
CREATE USER appuser WITH PASSWORD 'app_password';
GRANT ALL PRIVILEGES ON DATABASE contact_form_db TO appuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO appuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO appuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO appuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO appuser;
```

### 4. Generate and apply database migrations

Use Drizzle ORM's CLI to generate and apply migrations reflecting the current schema:

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

### 5. Seed the database (optional)

To populate the database with example data for development/testing, run:

```bash
node src/db/seed.ts
```

---

## 🧪 Testing

### Manual Testing

Use `curl`, Postman, or any API client to:

- Submit a valid payload and confirm `201 Created` with the inserted record ID
- Submit invalid payloads to see detailed validation error responses
- Submit duplicate email to test conflict error handling

### Automated Testing

The project includes:

- Unit tests for validation logic
- Integration tests for service layer and database interaction
- End-to-end tests for API endpoint behavior

Tests are run using Vitest and Playwright. Run tests with:

```bash
pnpm test
```

---

## 📎 For Developers

- All feature logic is isolated per file with strict separation of concerns.
- DB credentials are loaded only via `.env`.
- No helper abstractions — follow the import tree for clarity.
- Validation is performed using Zod schemas in the service layer.
- Database insert logic uses Drizzle ORM with type-safe queries.
- Centralized error handling ensures consistent API responses.
- Migration and seed scripts support safe, repeatable database management.
- Testing covers unit, integration, and end-to-end scenarios.
- Code quality is enforced with ESLint, Prettier, Commitlint, and Husky hooks.
- Node.js version 22 and pnpm package manager are specified for environment consistency.

---

## ✅ Definition of Done

This implementation has passed all checks:

- [x] All validation rules enforced with detailed error reporting
- [x] Database connection and insertion tested with Drizzle ORM
- [x] Structured JSON error reporting with centralized error mapping
- [x] Manual and automated tests covering all layers
- [x] Fully aligned with task specification and SMAP software engineering process
- [x] Comprehensive documentation covering setup, architecture, and testing

---

This README reflects the current state of the project, incorporating all upgrades and improvements made during development.
