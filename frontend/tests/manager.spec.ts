/**
 * MANAGER VIEW E2E TESTS
 * ----------------------
 * Tests the Manager Assignment view after authentication.
 * Uses saved auth cookies (storageState) — NO login UI interaction.
 *
 * What is tested:
 *  - Manager view loads correctly
 *  - If no manager assigned: shows the assignment panel
 *  - If manager assigned: shows the manager profile card
 *  - Invalid manager code shows an error
 */

import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CLIENT_AUTH = path.join(__dirname, 'setup/client-auth.json');

test.use({ storageState: CLIENT_AUTH });

test.describe('Manager View', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/dashboard/client/manager');
  });

  test('should load the manager view without crashing', async ({ page }) => {
    // Either the "Find Manager" panel OR the manager profile card should appear
    const hasAssignPanel = await page.getByText(/Connect with a Manager/i).first().isVisible({ timeout: 15000 });
    const hasManagerCard = await page.getByText(/Senior Portfolio Manager/i).first().isVisible({ timeout: 2000 });

    expect(hasAssignPanel || hasManagerCard).toBeTruthy();
  });

  test('should show the assign manager form when no manager is assigned', async ({ page }) => {
    const assignPanel = page.getByText(/Connect with a Manager/i);
    const isVisible = await assignPanel.isVisible({ timeout: 5000 });

    if (isVisible) {
      // The code input and "Assign" button must be present
      await expect(page.getByPlaceholder(/Enter manager code/i)).toBeVisible();
      await expect(page.getByRole('button', { name: /Assign/i })).toBeVisible();
    }
  });

  test('should show an error for an invalid manager code', async ({ page }) => {
    const assignPanel = page.getByText(/Connect with a Manager/i);
    const isAssignMode = await assignPanel.isVisible({ timeout: 5000 });

    if (isAssignMode) {
      await page.getByPlaceholder(/Enter manager code/i).fill('INVALID-CODE-XYZ');
      await page.getByRole('button', { name: /Assign/i }).click();

      // Should show error toast
      await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    }
  });

});
