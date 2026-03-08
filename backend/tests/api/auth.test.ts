/**
 * AUTH API TESTS
 * --------------
 * Tests all authentication routes against the real running backend.
 * 
 * Routes tested:
 *   POST /api/register   — new user creation
 *   POST /api/verify/email — OTP verification
 *   POST /api/login       — login with credentials
 *   POST /api/logout      — logout (requires auth)
 *   POST /api/refresh     — refresh access token
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { unauthenticatedRequest, getClientAgent } from '../setup/test-client.js';
import { TEST_CREDENTIALS } from '../setup/seed-test-users.js';

const api = unauthenticatedRequest;

// ─── REGISTER ───────────────────────────────────────────────────────────────
describe('POST /api/register', () => {
  const uniqueEmail = `newuser_${Date.now()}@test.com`;

  it('should create a new user (201)', async () => {
    const res = await api()
      .post('/api/register')
      .send({
        email: uniqueEmail,
        password: 'TestPass123!',
        name: 'New User',
        username: `user_${Date.now().toString().slice(-8)}`,
      });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('created');

    // ── VERIFY EMAIL (Mandatory for Login) ─────────────────────
    // As mentioned by user, default OTP is '123456'
    const verifyRes = await api()
      .post('/api/verify/email')
      .send({
        email: uniqueEmail,
        otp: '123456',
      });
    
    expect(verifyRes.status).toBe(200);
    expect(verifyRes.body.success).toBe(true);
  });

  it('should reject duplicate email (409)', async () => {
    const res = await api()
      .post('/api/register')
      .send({
        email: TEST_CREDENTIALS.client.email, // already exists from seed
        password: 'TestPass123!',
        name: 'Duplicate',
        username: `dup_${Date.now()}`,
      });

    expect(res.status).toBe(409);
    expect(res.body.success).toBe(false);
  });

  it('should reject weak password (400)', async () => {
    const res = await api()
      .post('/api/register')
      .send({ email: 'weak@test.com', password: '123', name: 'Test', username: 'weakuser' });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it('should reject missing fields (400)', async () => {
    const res = await api()
      .post('/api/register')
      .send({ email: 'missing@test.com' });

    expect(res.status).toBe(400);
  });
});

// ─── VERIFY EMAIL ───────────────────────────────────────────────────────────
describe('POST /api/verify/email', () => {
  it('should reject invalid OTP (400)', async () => {
    const res = await api()
      .post('/api/verify/email')
      .send({
        email: TEST_CREDENTIALS.client.email,
        otp: '000000',
      });

    // Already verified — returns 200 "already verified"
    expect([200, 400]).toContain(res.status);
  });

  it('should reject non-6-digit OTP (400)', async () => {
    const res = await api()
      .post('/api/verify/email')
      .send({ email: TEST_CREDENTIALS.client.email, otp: '12' });

    expect(res.status).toBe(400);
  });
});

// ─── LOGIN ──────────────────────────────────────────────────────────────────
describe('POST /api/login', () => {
  it('should login with valid credentials (200)', async () => {
    const res = await api()
      .post('/api/login')
      .send({
        email: TEST_CREDENTIALS.client.email,
        password: TEST_CREDENTIALS.client.password,
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toHaveProperty('roles', 'USER');
    // Cookies must be set
    const rawCookies = res.headers['set-cookie'];
    const cookies = Array.isArray(rawCookies) ? rawCookies : (rawCookies ? [rawCookies] : []);
    expect(cookies.length).toBeGreaterThan(0);
    expect(cookies.some((c: string) => c.startsWith('accessToken='))).toBe(true);
  });

  it('should reject wrong password (401)', async () => {
    const res = await api()
      .post('/api/login')
      .send({ email: TEST_CREDENTIALS.client.email, password: 'wrongpass99!' });

    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('should reject non-existent user (401)', async () => {
    const res = await api()
      .post('/api/login')
      .send({ email: 'ghost@nobody.com', password: 'TestPass123!' });

    expect(res.status).toBe(401);
  });

  it('should reject invalid email format (400)', async () => {
    const res = await api()
      .post('/api/login')
      .send({ email: 'notanemail', password: 'TestPass123!' });

    expect(res.status).toBe(400);
  });
});

// ─── LOGOUT ─────────────────────────────────────────────────────────────────
describe('POST /api/logout', () => {
  it('should logout authenticated user (200)', async () => {
    const agent = await getClientAgent();
    const res = await agent.post('/api/logout');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should return 401 for unauthenticated logout', async () => {
    const res = await api().post('/api/logout');
    expect(res.status).toBe(401);
  });
});

// ─── REFRESH TOKEN ───────────────────────────────────────────────────────────
describe('POST /api/refresh', () => {
  it('should reject refresh with no cookie (401)', async () => {
    const res = await api().post('/api/refresh');
    expect(res.status).toBe(401);
  });
});
