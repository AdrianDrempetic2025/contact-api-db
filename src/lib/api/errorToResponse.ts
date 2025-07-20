import { NextResponse } from 'next/server';

export function errorToResponse(err: any) {
  const status = err.status ?? 500;
  const body = {
    message: err.message ?? 'Internal Server Error',
    ...(err.issues && { issues: err.issues }),
  };
  return NextResponse.json(body, { status });
}
