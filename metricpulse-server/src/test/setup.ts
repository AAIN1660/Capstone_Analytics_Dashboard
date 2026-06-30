import { beforeAll, afterAll } from 'vitest';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '../..');

process.env.DATABASE_URL = `file:${path.join(root, 'test.db')}`;
process.env.NODE_ENV = 'test';

beforeAll(() => {
  execSync('npx prisma migrate deploy', {
    cwd: root,
    env: process.env,
    stdio: 'pipe',
  });
  execSync('npx tsx prisma/seed.ts', {
    cwd: root,
    env: process.env,
    stdio: 'pipe',
  });
});

afterAll(() => {
  try {
    execSync('npx prisma db execute --stdin', {
      cwd: root,
      env: process.env,
      input: 'DELETE FROM Sale;',
      stdio: 'pipe',
    });
  } catch {
    // ignore cleanup errors in test env
  }
});
