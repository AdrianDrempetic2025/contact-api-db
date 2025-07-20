import { describe, test, expect } from 'vitest';
import { contactInputSchema } from '../../src/modules/contacts/model/contact.schema';

describe('contactInputSchema', () => {
  test('valid payload passes', () => {
    const data = { name: 'John', email: 'john@a.com', message: 'hi there' };
    expect(contactInputSchema.parse(data)).toEqual(data);
  });

  test('invalid email fails', () => {
    expect(() => contactInputSchema.parse({ name: 'John', email: 'bad', message: 'hi there' })).toThrow();
  });
});
