# Phase 2: Create and Code - `lib/validateContact.ts`

## Overview
This document details the creation and content of the `lib/validateContact.ts` file, which provides a pure utility function for validating incoming contact message data.

## File Creation and Content

### File Path
The file was created at `lib/validateContact.ts` relative to the project root.

### Purpose
The `validateContact.ts` module exports a `validateContactInput` function designed to perform robust validation on JSON input bodies for contact messages. Its purpose is to ensure data integrity and adherence to business rules before processing or storing the data.

### Function Signature
The module exports a single function with the following signature:

```typescript
export function validateContactInput(input: any): {
  valid: boolean;
  errors: Record<string, string>;
}
```

### Validation Rules Implemented
The `validateContactInput` function enforces the following validation rules:

-   **Presence and Type**:
    -   `name`: Must be present and a `string`.
    -   `email`: Must be present and a `string`.
    -   `message`: Must be present and a `string`.
-   **Email Format**:
    -   The `email` property is validated against the `EMAIL_REGEX` constant, imported from `../config/constants.ts`.
-   **Message Length**:
    -   The `message` property's length must be greater than or equal to `MIN_MESSAGE_LENGTH`, also imported from `../config/constants.ts`.

### Output Structure
-   **Failure Output**: If validation fails, the function returns an object with `valid: false` and an `errors` object. The `errors` object contains specific error messages for each field that failed validation (e.g., `errors.name = "Name is required"`). Only fields that failed validation are included in the `errors` object.
-   **Success Output**: If all validation rules pass, the function returns an object with `valid: true` and an empty `errors` object (`{}`).

### Code Quality and Best Practices
-   **Pure Module**: The module is self-contained and does not depend on HTTP or database layers, ensuring its reusability and testability.
-   **Pure Function**: The `validateContactInput` function is a pure function; its output depends solely on its input, and it produces no side effects.
-   **Error Handling**: The function does not throw errors but instead returns a structured result, allowing for graceful error handling in the calling code.
-   **Dependency**: It only imports necessary constants from `config/constants.ts`.

## How it was Achieved
1.  **File Creation**: The `validateContact.ts` file was created manually within the `lib` directory.
2.  **Content Population**: The specified TypeScript code for the `validateContactInput` function, including imports, validation logic, and JSDoc comments, was directly written into the file.

## Next Steps
The `validateContactInput` function is now ready to be imported and used by API endpoints or other parts of the application that require contact message input validation.
