import { createContact } from '@modules/contacts/service/createContact';
import { errorToResponse } from '@lib/api/errorToResponse';

export async function handleCreateContact(input: {
  method: string;
  headers: Record<string, string>;
  body: any;
}): Promise<{ status: number; body: any }> {
  if (input.method !== 'POST') {
    return { status: 405, body: { message: 'Method Not Allowed' } };
  }

  if (input.headers['content-type'] !== 'application/json') {
    return { status: 400, body: { message: 'Invalid Content-Type' } };
  }

  try {
    const result = await createContact(input.body);
    return { status: 201, body: result };
  } catch (err: any) {
    // Pass the error directly to errorToResponse
    return errorToResponse(err);
  }
}
