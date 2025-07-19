# 📬 Contact Form API — Backend Endpoint

## 🧭 Overview

This project implements a secure, minimal, and fully testable **REST API endpoint** for accepting contact form submissions. The API receives `POST` requests at `/api/contacts`, performs strict validation, and stores the messages in a PostgreSQL database.

✅ Built using the **SMAP** (Software Manufacturing Assembly Protocol) — a deterministic software engineering process that guarantees **correctness**, **traceability**, and **testability** at every step.

---

## 📦 Features

- Strict input validation (name, email, message)
- Flat relational database model (PostgreSQL)
- Single responsibility handler
- No abstractions or framework bloat
- Clean and verifiable logic
- Easily testable (Postman, curl, integration tests)
- Environment-based DB connection via `.env`

---

## 🚀 API Specification

**Endpoint:**  
`POST /api/contacts`

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
{ "success": true }
```

**Validation Error Response:**

```json
{
  "errors": {
    "email": "Invalid format",
    "message": "Too short"
  }
}
```

---

## 🛡 Validation Rules

* `name`: Required
* `email`: Required, valid email format
* `message`: Required, minimum 20 characters

---

## 🧱 Database Schema

PostgreSQL is used with a single table:

```sql
Table: contact_messages
  - id          SERIAL PRIMARY KEY
  - name        TEXT NOT NULL
  - email       TEXT NOT NULL
  - message     TEXT NOT NULL
  - created_at  TIMESTAMP DEFAULT now()
```

Stored using `pg` with Drizzle ORM.

---

## 🛠 Setup & Development

### 1. Clone the repo and install dependencies

```bash
git clone <your-repo>
cd contact-api
npm install
```

### 2. Create `.env` file

```
DATABASE_URL=postgresql://<user>:<password>@localhost:5432/contact_form_db
```

### 3. Set up PostgreSQL

If not already done:

```sql
CREATE DATABASE contact_form_db;
CREATE USER appuser WITH PASSWORD 'app_password';
GRANT ALL PRIVILEGES ON DATABASE contact_form_db TO appuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO appuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO appuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON TABLES TO appuser;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL PRIVILEGES ON SEQUENCES TO appuser;
```

### 4. Generate and apply database migration

```bash
npx drizzle-kit generate
npx drizzle-kit push
```

---

## 🧪 Testing

### Manual Testing

Use `curl`, Postman, or any API client to:

* Submit a valid payload and confirm `200 OK`
* Submit invalid payloads to see proper error responses

### Inspect Database

```sql
SELECT * FROM contact_messages ORDER BY created_at DESC;
```

### Integration Testing (optional)

All logic is structured for integration testing using any Node.js testing framework (e.g. Jest, Vitest, Supertest).

---

## 🔁 Project Structure

```
.
├── config/
│   └── constants.ts         # Shared constants and validation rules
├── lib/
│   ├── db.ts                # DB connection and insertion logic
│   └── validate.ts          # Input validation logic
├── pages/
│   └── api/
│       └── contacts/
│           └── POST.ts      # Main API handler
├── drizzle.config.ts        # Drizzle ORM configuration
├── scripts/
│   └── dbCheck.ts           # Test script for DB connection
└── .env                     # DB connection string
```

---

## 📎 For Developers

* All feature logic is isolated per file with strict separation of concerns.
* DB credentials are loaded only via `.env`.
* No helper abstractions — follow the import tree.
* DB insert logic is in `lib/db.ts`, validation in `lib/validate.ts`.

---

## ✅ Definition of Done

This implementation has passed all checks:

* [x] All validation rules enforced
* [x] Database connection and insertion tested
* [x] Structured JSON error reporting
* [x] Manual and programmatic tests possible
* [x] Fully aligned with task spec and SMAP build process

---

## 🧠 Why SMAP?

This project was built with **SMAP (Software Manufacturing Assembly Protocol)** — a deterministic engineering method focused on:

1. **Correctness-by-construction**
2. **Error-resistant implementation**
3. **Clarity, traceability, and reproducibility**

For more info, ask the engineering team or visit the internal SMAP reference.

---
