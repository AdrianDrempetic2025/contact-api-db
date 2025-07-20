# E2E Testing Implementation with Playwright

## Overview

This document summarizes the implementation of an end-to-end (E2E) smoke test for the contact form using Playwright in the current backend-only TypeScript project.

## What Has Been Achieved

- Created a new folder structure for E2E tests:
  - `tests/e2e/submitContact.spec.ts`

- Implemented the E2E test in `submitContact.spec.ts`:
  - Uses `@playwright/test` framework.
  - Reads the `STAGING_URL` environment variable.
  - If `STAGING_URL` is not set, falls back to `http://localhost:3000` for local testing.
  - Automates filling the contact form fields and submitting the form.
  - Asserts that the success message "Thank you" appears after submission.

- Added `playwright.config.ts` in the project root:
  - Configures Playwright to use `tests/e2e` as the test directory.
  - Loads environment variables from `.env`.
  - Sets the base URL from `STAGING_URL`.

- Updated `.env.example` and `.env` files to include the `STAGING_URL` variable placeholder.

- Installed Playwright and downloaded necessary browser binaries.

## Current Limitations

- The application is not yet deployed to a staging environment.
- The `STAGING_URL` currently points to a placeholder URL (`https://your-staging-url.com`), which is not reachable.
- As a result, the E2E test fails when trying to navigate to the placeholder URL.

## Next Steps

- Deploy the application to a staging environment and update the `STAGING_URL` in `.env` accordingly.
- Run the E2E tests against the deployed staging URL.
- Alternatively, run the E2E tests locally by starting the application on `http://localhost:3000` and running the tests with the fallback URL.

## Running the Tests

To run the E2E tests locally or against staging, use the following command:

2. Start the App Locally Before Running E2E

You must start the local dev server manually first:
pnpm dev

Then, in another terminal:
pnpm dlx playwright test tests/e2e/submitContact.spec.ts

Then:
npx playwright test

Ensure the `.env` file contains the correct `STAGING_URL` or that the local server is running on `http://localhost:3000`.

---

This setup provides a solid foundation for automated browser testing of the contact form, enabling early detection of issues in the user interface and form submission flow.
