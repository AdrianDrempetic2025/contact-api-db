// app/api/contacts/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { createContact } from '@/modules/contacts/service/createContact';
import { errorToResponse } from '@/lib/api/errorToResponse';

export async function POST(req: NextRequest): Promise<Response> {
  try {
    const data = await req.json();
    const contact = await createContact(data);
    return NextResponse.json({ id: contact.id }, { status: 201 });
  } catch (error) {
    return errorToResponse(error);
  }
}
