import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']),
  DATABASE_URL: z.string().url(),
  LOG_LEVEL: z.string().default('info'),
  PORT: z.string().regex(/^\d+$/).transform(Number).default(3000)
});

export const env = envSchema.parse(process.env);
