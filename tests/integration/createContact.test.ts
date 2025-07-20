import { describe, test, beforeAll, afterEach, afterAll, expect } from 'vitest';
import supertest from 'supertest';
import { createServer } from '../../testHelpers/testServer';
import { db } from '@/src/db/client';
import { contactMessages } from '@/src/db/schema';

const request = createServer();

describe('/api/contacts POST handler', () => {
  beforeAll(async () => {
    // Setup if needed
  });

  afterEach(async () => {
    // Clean the contacts table after each test
    await db.delete(contactMessages);
  });

  afterAll(async () => {
    // Cleanup if needed
    // Removed db.end() as it does not exist on db instance
  });

  test('should return 201 and valid id on successful contact creation', async () => {
    const payload = {
      name: 'Test User',
      email: 'test.user@example.com',
      message: 'This is a test message',
    };

    const response = await request.post('/api/contacts').send(payload);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('number');
  });
});
