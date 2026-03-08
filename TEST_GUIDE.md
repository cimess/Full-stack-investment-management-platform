# 🧪 NovaInvest — Test Guide

## Overview

NovaInvest has a **production-grade two-layer testing suite** that covers:

| Layer | Tool | What it tests |
|---|---|---|
| **API Tests** | Vitest + Supertest | Backend routes, auth, DB queries |
| **E2E Tests** | Playwright | UI flows, navigation, dashboard rendering |

> **None of these tests run in production.** Tests only run when you explicitly call them.

---

## ▶️ Run Everything (Single Command)

Make sure **both servers are running first**:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd frontend && npm run dev
```

Then in a **third terminal**, from the project root:

```bash
chmod +x run-tests.sh   # only need to do this once
./run-tests.sh
```

This will:
1. 🌱 Seed test users into your database
2. 🔬 Run all backend API tests
3. 🎭 Run all E2E browser tests
4. 📊 Show a pass/fail summary

---

## 🔬 Backend API Tests Only

```bash
cd backend
npm run test:api
```

**What's tested:**
- `POST /api/register` — signup validation, duplicate detection
- `POST /api/verify/email` — OTP verification
- `POST /api/login` — credentials, wrong password, unverified user
- `POST /api/logout` — authenticated/unauthenticated
- `GET  /api/client/dashboard` — auth guard, response shape
- `POST /api/client/buy/stock` — input validation
- `POST /api/client/sell/stock` — non-owned stock, auth
- `POST /api/market/quotes` — valid/invalid symbols
- `POST /api/market/search` — symbol search

---

## 🎭 E2E Browser Tests Only

```bash
cd frontend
npm run test:e2e
```

To open the **interactive UI** (great for debugging):
```bash
cd frontend
npm run test:e2e:ui
```

After running, view the HTML report:
```bash
cd frontend && npx playwright show-report
```

**What's tested:**
- Login page renders and validates
- Correct password → redirects to dashboard
- Wrong password → shows error toast
- Verify email page renders correctly
- Client dashboard stat cards load
- Portfolio view (table or empty state)
- Transactions view loads
- Market Explorer → default stocks visible → search works
- Manager view renders (assign panel or manager card)

---

## ➕ Adding Tests for New Features

When you add a new feature, add tests in the right place:

### New backend route?
→ Add to `backend/tests/api/` — create a new `yourfeature.test.ts`

```typescript
import { describe, it, expect, beforeAll } from 'vitest';
import { getClientAgent } from '../setup/test-client.js';

let agent;
beforeAll(async () => { agent = await getClientAgent(); });

describe('POST /api/your/route', () => {
  it('should do something (200)', async () => {
    const res = await agent.post('/api/your/route').send({ ... });
    expect(res.status).toBe(200);
  });
});
```

### New UI page?
→ Add to `frontend/tests/` — create a new `yourpage.spec.ts`

```typescript
import { test, expect } from '@playwright/test';
import path from 'path';
const CLIENT_AUTH = path.join(path.dirname(''), 'setup/client-auth.json');
test.use({ storageState: CLIENT_AUTH });

test('your new page loads', async ({ page }) => {
  await page.goto('/dashboard/client/yourpage');
  await expect(page.getByText(/Your Heading/i)).toBeVisible();
});
```

---

## 🔐 Test Accounts (Auto-Created by Seed Script)

| Role | Email | Password |
|---|---|---|
| Client | `testclient@novainvest.test` | `TestPass123!` |
| Manager | `testmanager@novainvest.test` | `TestPass123!` |
| Admin | `testadmin@novainvest.test` | `TestPass123!` |

**Manager approval code:** `TEST-MGR-001`

These accounts are created automatically by the seed script before tests run. You can also create them manually:
```bash
cd backend && npm run test:seed
```

---

## ⚠️ Before Deploying to Production

Tests should **never run in production**. The `tests/` folders are excluded from the production build automatically (TypeScript doesn't compile them in the Vite build).

For CI/CD (GitHub Actions), the `.github/workflows/playwright.yml` file already exists — you just need to add the API test step there when you set up a staging server.
