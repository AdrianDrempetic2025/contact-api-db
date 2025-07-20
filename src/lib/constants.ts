/**
 * Minimum allowed length for a contact message.
 * @type {number}
 */
export const MIN_MESSAGE_LENGTH: number = 20;

/**
 * Regular expression for validating email addresses.
 * @type {RegExp}
 */
export const EMAIL_REGEX: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Name of the database table for contact messages.
 * @type {string}
 */
export const TABLE_NAME: string = "contact_messages";

/**
 * Standard response for a malformed JSON request body.
 * @type {{ error: string }}
 */
export const MALFORMED_JSON_RESPONSE = { error: "Malformed JSON body" };

/**
 * Standard response for an internal server error.
 * @type {{ error: string }}
 */
export const INTERNAL_ERROR_RESPONSE = { error: "Internal server error" };

/**
 * Standard response for an invalid Content-Type header.
 * @type {{ error: string }}
 */
export const INVALID_CONTENT_TYPE_RESPONSE = { error: "Content-Type must be application/json" };

/**
 * Standard response for an unsupported HTTP method.
 * @type {{ error: string }}
 */
export const METHOD_NOT_ALLOWED_RESPONSE = { error: "Method not allowed" };
