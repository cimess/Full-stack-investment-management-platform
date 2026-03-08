/**
 * MARKET API TESTS
 * ----------------
 * Tests the market data routes against the real running backend.
 * Uses a pre-authenticated agent (seeded test client user).
 */

import { describe, it, expect, beforeAll, vi } from 'vitest';
import { type Agent } from 'supertest';
import { getClientAgent, unauthenticatedRequest } from '../setup/test-client.js';

// ─── MOCK MARKET SERVICE ─────────────────────────────────────────────────────
// We mock the service to avoid hitting real external APIs (which hit 429 often)
vi.mock('../../services/marketservice.js', () => ({
  getQuotes: vi.fn().mockResolvedValue({
    success: true,
    data: [{ symbol: 'AAPL', price: 150, company: 'Apple Inc.' }]
  }),
  searchStock: vi.fn().mockResolvedValue({
    success: true,
    data: { quotes: [{ symbol: 'AAPL', shortName: 'Apple Inc.' }] }
  }),
  default: {
    getQuotes: vi.fn(),
    searchStock: vi.fn()
  }
}));

let clientAgent: Agent;

beforeAll(async () => {
  clientAgent = await getClientAgent();
});

// ─── MARKET QUOTES ───────────────────────────────────────────────────────────
describe('POST /api/market/quotes', () => {
  it('should return quote data for valid symbols (200)', async () => {
    const res = await clientAgent
      .post('/api/market/quotes')
      .send({ symbols: ['AAPL', 'NVDA'] });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should reject unauthenticated request (401)', async () => {
    const res = await unauthenticatedRequest()
      .post('/api/market/quotes')
      .send({ symbols: ['AAPL'] });

    expect(res.status).toBe(401);
  });

  it('should reject missing symbols (400)', async () => {
    const res = await clientAgent
      .post('/api/market/quotes')
      .send({});

    expect(res.status).toBe(400);
  });
});

// ─── MARKET SEARCH ───────────────────────────────────────────────────────────
describe('POST /api/market/search', () => {
  it('should return results for a valid search term (200)', async () => {
    const res = await clientAgent
      .post('/api/market/search')
      .send({ symbols: 'Apple' }); // Service/Controller uses 'symbols' as key

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });

  it('should reject unauthenticated request (401)', async () => {
    const res = await unauthenticatedRequest()
      .post('/api/market/search')
      .send({ symbols: 'Apple' });

    expect(res.status).toBe(401);
  });
});
