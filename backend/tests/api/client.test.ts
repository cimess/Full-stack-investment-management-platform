/**
 * CLIENT API TESTS
 * ----------------
 * Tests all client-facing routes against the real running backend.
 * Uses a pre-authenticated agent (seeded test client user).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { type Agent } from 'supertest';
import { getClientAgent, unauthenticatedRequest } from '../setup/test-client.js';
import { TEST_CREDENTIALS } from '../setup/seed-test-users.js';
import { prisma } from '../../lib/prisma.js';

let clientAgent: Agent;
let testStockId: string;

beforeAll(async () => {
  clientAgent = await getClientAgent();
  
  // Find the seeded Apple stock ID
  const stock = await prisma.stockTable.findUnique({ where: { symbol: 'AAPL' } });
  testStockId = stock?.id || 'fake-id';
});

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
describe('GET /api/client/dashboard', () => {
  it('should return dashboard data for auth client (200)', async () => {
    const res = await clientAgent.get('/api/client/dashboard');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should return 401 for unauthenticated request', async () => {
    const res = await unauthenticatedRequest().get('/api/client/dashboard');
    expect(res.status).toBe(401);
  });
});

// ─── BUY STOCK ───────────────────────────────────────────────────────────────
describe('POST /api/client/buy/stock', () => {
  it('should reject missing or invalid stock_id (400 or 404)', async () => {
    const res = await clientAgent
      .post('/api/client/buy/stock')
      .send({ quantity: 5 }); // missing stock_id

    expect([400, 422]).toContain(res.status);
  });

  it('should reject zero quantity (400)', async () => {
    const res = await clientAgent
      .post('/api/client/buy/stock')
      .send({ stock_id: testStockId, quantity: 0 });

    expect(res.status).toBe(400);
  });

  it('should require authentication (401)', async () => {
    const res = await unauthenticatedRequest()
      .post('/api/client/buy/stock')
      .send({ stock_id: testStockId, quantity: 1 });

    expect(res.status).toBe(401);
  });
});

// ─── SELL STOCK ──────────────────────────────────────────────────────────────
describe('POST /api/client/sell/stock', () => {
  it('should reject selling non-owned stock (403)', async () => {
    // Fails because client has no manager yet
    const res = await clientAgent
      .post('/api/client/sell/stock')
      .send({ stock_id: testStockId, quantity: 1 });

    expect([400, 403]).toContain(res.status);
  });
});

// ─── ADD MANAGER ─────────────────────────────────────────────────────────────
describe('POST /api/client/add/manager', () => {
  it('should reject missing manager_id (400)', async () => {
    const res = await clientAgent
      .post('/api/client/add/manager')
      .send({}); // missing manager_id

    expect(res.status).toBe(400);
  });

  it('should require authentication (401)', async () => {
    const res = await unauthenticatedRequest()
      .post('/api/client/add/manager')
      .send({ manager_id: 'some-id' });

    expect(res.status).toBe(401);
  });
});
