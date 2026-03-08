/**
 * MARKET VIEW E2E TESTS
 * ---------------------
 * Tests the Market Explorer view after authentication.
 * Uses saved auth cookies (storageState) — NO login UI interaction.
 *
 * What is tested:
 *  - Market view loads with default stock cards
 *  - Search bar is visible and functional
 *  - Default symbols (AAPL, NVDA) appear
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_AUTH = path.join(__dirname, 'setup/client-auth.json');

test.use({ storageState: CLIENT_AUTH });

test.describe('Market Explorer View', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/client/market');
  });

  test('should load Market Explorer heading', async ({ page }) => {
    await expect(page.getByText(/Market Explorer/i)).toBeVisible({ timeout: 15000 });
  });

  test('should show the search bar', async ({ page }) => {
    await expect(page.getByPlaceholder(/search symbol or company/i)).toBeVisible({ timeout: 10000 });
  });

  test('should display default stock cards (AAPL, NVDA)', async ({ page }) => {
    await expect(page.getByText(/AAPL/).first()).toBeVisible({ timeout: 15000 });
    await expect(page.getByText(/NVDA/).first()).toBeVisible({ timeout: 15000 });
  });

  test('should show results when searching for a stock', async ({ page }) => {
    const searchInput = page.getByPlaceholder(/search symbol or company/i);
    await searchInput.fill('IBM');

    // Wait for debounce + API response
    await expect(page.getByText(/IBM/).first()).toBeVisible({ timeout: 15000 });
  });

});
