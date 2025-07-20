import { z } from 'zod';
import { contactMessages } from '@/src/db/schema'; // Corrected import path

// Define a basic Zod schema for contact input, assuming it aligns with the DB schema
export const contactInputSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  message: z.string().min(1, { message: "Message is required" }),
});

export function validateContactInput(input: unknown): {
  valid: boolean;
  errors: Record<string, string>;
} {
  try {
    contactInputSchema.parse(input);
    return { valid: true, errors: {} };
  } catch (err) {
    if (err instanceof z.ZodError) {
      const formatted = err.flatten().fieldErrors as Record<string, string[]>;
      const errors: { [key: string]: string } = {};
      for (const field in formatted) {
        if (formatted[field]?.length) {
          errors[field] = formatted[field][0]; // Return first message per field
        }
      }
      return { valid: false, errors };
    }
    throw err;
  }
}
