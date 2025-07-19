import { NextApiRequest, NextApiResponse } from 'next';
import { validateContactInput } from '../../../lib/validateContact';
import { insertContactMessage } from '../../../lib/db';
import {
  METHOD_NOT_ALLOWED_RESPONSE,
  INVALID_CONTENT_TYPE_RESPONSE,
  MALFORMED_JSON_RESPONSE,
  INTERNAL_ERROR_RESPONSE,
} from '../../../config/constants';

export default async function POST(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  // 1. Method Validation
  if (req.method !== 'POST') {
    res.status(405).json(METHOD_NOT_ALLOWED_RESPONSE);
    return;
  }

  // 2. Content-Type Validation
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400).json(INVALID_CONTENT_TYPE_RESPONSE);
    return;
  }

  let parsedBody: any;
  // 3. JSON Body Parsing & Error Handling
  try {
    parsedBody = JSON.parse(req.body);
  } catch (error) {
    res.status(400).json(MALFORMED_JSON_RESPONSE);
    return;
  }

  // 4. Input Validation (using validateContactInput)
  const validationResult = validateContactInput(parsedBody);
  if (!validationResult.valid) {
    res.status(400).json(validationResult.errors);
    return;
  }

  // Extract validated data
  const { name, email, message } = parsedBody;

  // 5. Database Insertion (using insertContactMessage)
  try {
    await insertContactMessage(name, email, message);
    res.status(200).json({ success: true });
    return;
  } catch (error) {
    // Errors are silently caught in lib/db.ts, but this catch is for any unexpected errors
    res.status(500).json(INTERNAL_ERROR_RESPONSE);
    return;
  }
}
