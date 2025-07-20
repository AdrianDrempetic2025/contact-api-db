// app/api/contacts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { validateContactInput } from '@/src/modules/contacts/model/contact.schema';
import { createContact } from '@/src/modules/contacts/service/createContact'; // Import createContact
import { errorToResponse } from '@/src/lib/api/errorToResponse'; // Import errorToResponse
import {
  INVALID_CONTENT_TYPE_RESPONSE,
  MALFORMED_JSON_RESPONSE,
} from '@/src/lib/constants';

export async function POST(req: NextRequest): Promise<Response> {
  // 1. Content-Type Validation
  const contentType = req.headers.get('content-type');
  if (contentType !== 'application/json') {
    return NextResponse.json(INVALID_CONTENT_TYPE_RESPONSE, { status: 400 });
  }

  // 2. JSON Body Parsing & Error Handling
  let parsedBody: unknown;
  try {
    parsedBody = await req.json();
  } catch (error) {
    // Pass the error to the errorToResponse utility
    return errorToResponse({ message: 'Malformed JSON', status: 400, issues: error });
  }

  // 3. Input Validation
  const validationResult = validateContactInput(parsedBody);
  if (!validationResult.valid) {
    return NextResponse.json(validationResult.errors, { status: 400 });
  }

  // 4. Create Contact using the service
  try {
    const { name, email, message } = parsedBody as any; // Assuming parsedBody is correctly typed after validation
    const contact = await createContact({ name, email, message }); // Call createContact
    // Return 201 response with ID on success
    return NextResponse.json({ id: contact.id }, { status: 201 });
  } catch (error: any) {
    // Catch and return errorToResponse(err)
    return errorToResponse(error);
  }
}
