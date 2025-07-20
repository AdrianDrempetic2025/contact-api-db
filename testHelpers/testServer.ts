import { createServer as createHttpServer, IncomingMessage, ServerResponse } from 'http';
import supertest from 'supertest';
import { POST } from '../app/api/contacts/route'; // Adjusted relative import path

export function createServer() {
  const server = createHttpServer(async (req: IncomingMessage, res: ServerResponse) => {
    if (req.method === 'POST' && req.url === '/api/contacts') {
      const response = await POST(req as any);
      res.statusCode = response.status;
      for (const [key, value] of Object.entries(response.headers)) {
        res.setHeader(key, value as string);
      }
      const body = await response.json();
      res.end(JSON.stringify(body));
    } else {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  server.listen(0);

  const address = server.address();
  if (!address || typeof address === 'string') {
    throw new Error('Failed to get server address');
  }
  const url = `http://localhost:${address.port}`;
  return supertest(url);
}
