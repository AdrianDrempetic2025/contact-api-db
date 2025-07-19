import { MIN_MESSAGE_LENGTH, EMAIL_REGEX } from '../config/constants';

/**
 * Validates the input for a contact message.
 * Ensures name, email, and message are present, are strings,
 * email matches a valid format, and message meets minimum length.
 *
 * @param {any} input - The input object to validate.
 * @returns {{ valid: boolean; errors: Record<string, string> }} - Validation result.
 */
export function validateContactInput(input: any): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  // Validate name
  if (typeof input.name !== 'string' || input.name.trim() === '') {
    errors.name = 'Name is required';
  }

  // Validate email
  if (typeof input.email !== 'string' || !EMAIL_REGEX.test(input.email)) {
    errors.email = 'Invalid email address';
  }

  // Validate message
  if (typeof input.message !== 'string' || input.message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
