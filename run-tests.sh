#!/bin/bash
# ============================================================
# RUN ALL TESTS — NovaInvest
# ============================================================
# Runs BOTH layers of the test suite:
#   1. Backend API tests (Vitest + Supertest)
#   2. Frontend E2E tests (Playwright)
#
# REQUIREMENTS before running:
#   - Backend server must be running:  cd backend && npm run dev
#   - Frontend dev server must be running: cd frontend && npm run dev
#
# HOW TO RUN:
#   chmod +x run-tests.sh
#   ./run-tests.sh
# ============================================================

set -e  # Exit immediately if any command fails

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND="$ROOT/backend"
FRONTEND="$ROOT/frontend"

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "║       NovaInvest Test Suite Runner           ║"
echo "╚══════════════════════════════════════════════╝"
echo ""

# ── Step 1: Seed test database ─────────────────────────────
echo "🌱 [1/3] Seeding test users into the database..."
cd "$BACKEND"
npx tsx tests/setup/seed-test-users.ts
echo ""

# ── Step 2: Backend API Tests ──────────────────────────────
echo "🔬 [2/3] Running Backend API Tests (Vitest + Supertest)..."
echo "─────────────────────────────────────────────────────────"
cd "$BACKEND"
npm run test:api
echo ""

# ── Step 3: E2E Tests ─────────────────────────────────────
echo "🎭 [3/3] Running Frontend E2E Tests (Playwright)..."
echo "─────────────────────────────────────────────────────────"
cd "$FRONTEND"
npm run test:e2e
echo ""

echo "✅ All tests complete!"
echo "📊 E2E Report: cd frontend && npx playwright show-report"
echo ""
