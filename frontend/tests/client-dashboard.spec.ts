/**
 * CLIENT DASHBOARD E2E TESTS
 * --------------------------
 * Tests all client dashboard views after authentication.
 * Uses saved auth cookies (storageState) — NO login UI interaction.
 *
 * What is tested:
 *  - Overview: stat cards, chart renders
 *  - Portfolio: table/empty state, Buy/Sell buttons
 *  - Transactions: history list or empty state
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_AUTH = path.join(__dirname, 'setup/client-auth.json');

// All tests in this file load the saved authenticated session
test.use({ storageState: CLIENT_AUTH });

test.describe('Client Dashboard — Overview', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/client');
  });

  test('should load the overview and show all stat cards', async ({ page }) => {
    await expect(page.getByText(/Portfolio Value/i)).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/Active Positions/i)).toBeVisible();
    await expect(page.getByText(/Total Profit/i)).toBeVisible();
  });

  test('should show the area chart', async ({ page }) => {
    // Recharts renders an SVG
    await expect(page.locator('svg.recharts-surface')).toBeVisible({ timeout: 10000 });
  });

  test('should show quick action buttons', async ({ page }) => {
    await expect(page.getByText(/Market/i).first()).toBeVisible();
    await expect(page.getByText(/Portfolio/i).first()).toBeVisible();
    await expect(page.getByText(/History|Transactions/i).first()).toBeVisible();
  });

});

test.describe('Client Dashboard — Portfolio View', () => {

  test('should load the portfolio view', async ({ page }) => {
    await page.goto('/dashboard/client/portfolio');

    // Either the table header OR the empty state should be visible
    const hasTable = await page.getByText(/Symbol/i).first().isVisible({ timeout: 15000 });
    const hasEmpty = await page.getByText(/No active investments/i).first().isVisible({ timeout: 2000 });

    expect(hasTable || hasEmpty).toBeTruthy();
  });

  test('should show Buy and Sell stock buttons', async ({ page }) => {
    await page.goto('/dashboard/client/portfolio');
    await expect(page.getByRole('button', { name: /Buy Stock/i })).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('button', { name: /Sell Stock/i })).toBeVisible();
  });

});

test.describe('Client Dashboard — Transactions View', () => {

  test('should load the transaction history view', async ({ page }) => {
    await page.goto('/dashboard/client/transactions');

    const hasHistory = await page.getByText(/Transaction History/i).first().isVisible({ timeout: 15000 });
    const hasEmpty = await page.getByText(/No transaction history found/i).first().isVisible({ timeout: 2000 });

    expect(hasHistory || hasEmpty).toBeTruthy();
  });

});
