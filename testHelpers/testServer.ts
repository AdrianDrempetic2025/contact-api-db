import { createServer as createHttpServer, IncomingMessage, ServerResponse } from 'http';
import supertest from 'supertest';
import { POST } from '../app/api/contacts/route';
import { NextRequest } from 'next/server';
import { Readable } from 'stream';

export function createServer() {
  const server = createHttpServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST' && req.url === '/api/contacts') {
      // Collect request body
      const chunks: Buffer[] = [];
      for await (const chunk of req) chunks.push(chunk);
      const rawBody = Buffer.concat(chunks);

      // Create a ReadableStream from the buffer
      const stream = Readable.from(rawBody);

      const nextReq = new NextRequest(`http://localhost${req.url}`, {
        method: req.method,
        headers: req.headers as HeadersInit,
        body: stream as any, // Acceptable workaround for NextRequest
      });

      const response = await POST(nextReq);

      res.statusCode = response.status;
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value as string);
      }
      const json = await response.text();
      res.end(json);
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  server.listen(0);
  const address = server.address();
  if (!address || typeof address === 'string') throw new Error('Invalid server address');

  const url = `http://localhost:${(address as any).port}`;
  return supertest(url);
}