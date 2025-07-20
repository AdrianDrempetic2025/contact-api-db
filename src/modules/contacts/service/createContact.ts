import { contactInputSchema } from '@modules/contacts/model/contact.schema';
import { db } from '@db/client';
import { contactMessages } from '@db/schema';
import { z } from 'zod';

export async function createContact(input: unknown) {
  try {
    const data = contactInputSchema.parse(input);

    const [inserted] = await db // Use db instance
      .insert(contactMessages) // Use correct table name
      .values(data)
      .returning({ id: contactMessages.id }); // Use correct table name

    if (!inserted) {
      throw new Error("Failed to retrieve inserted ID");
    }
    return { id: inserted.id };
  } catch (err: unknown) {
    if (err instanceof z.ZodError) { // Correctly referencing z.ZodError
      throw Object.assign(new Error('Validation failed'), {
        status: 400,
        // Assuming 'issues' is the correct property for ZodError details
        issues: err.issues, // Using err.issues as per Zod API
      });
    }

    // Assuming the error object from drizzle-orm might have a 'code' property
    if ((err as any).code === '23505') {
      throw Object.assign(new Error('Email already exists'), {
        status: 409,
      });
    }

    throw err;
  }
}
