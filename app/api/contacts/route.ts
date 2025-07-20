// app/api/contacts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { validateContactInput } from '@/src/modules/contacts/model/contact.schema';
import { insertContactMessage } from '@/src/db/client';
import {
  INVALID_CONTENT_TYPE_RESPONSE,
  MALFORMED_JSON_RESPONSE,
  INTERNAL_ERROR_RESPONSE,
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
  } catch {
    return NextResponse.json(MALFORMED_JSON_RESPONSE, { status: 400 });
  }

  // 3. Input Validation
  const validationResult = validateContactInput(parsedBody);
  if (!validationResult.valid) {
    return NextResponse.json(validationResult.errors, { status: 400 });
  }

  const { name, email, message } = parsedBody as any;

  // 4. Insert into DB
  try {
    await insertContactMessage(name, email, message);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(INTERNAL_ERROR_RESPONSE, { status: 500 });
  }
}
