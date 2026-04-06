/**
 * AUTH E2E TESTS
 * -------------
 * Tests the Login page UI using the pre-seeded test client user.
 * Does NOT test registration to avoid modifying the DB during tests.
 * 
 * What is tested:
 *  - Login page renders correctly
 *  - Login with valid credentials redirects to /dashboard/client
 *  - Wrong password shows an error toast
 *  - Verify email page (navigation, OTP input, submit button render)
 */

import { test, expect } from '@playwright/test';

// Test with the real seeded user — no registration needed
const CLIENT = {
  email: 'testclient@cimessinvest.test',
  password: 'TestPass123!',
};

test.describe('Login Page', () => {

  test('should render the login form correctly', async ({ page }) => {
    await page.goto('/login');

    await expect(page.getByText(/Welcome Back/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Password/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Sign In/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Sign up/i })).toBeVisible();
  });

  test('should show error toast on wrong password', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder(/Email/i).fill(CLIENT.email);
    await page.getByPlaceholder(/Password/i).fill('wrongpassword99!');
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Error toast should appear
    await expect(page.getByRole('alert')).toBeVisible({ timeout: 10000 });
    await expect(page.getByRole('alert')).toContainText(/invalid|wrong|error|failed/i);
    // Should NOT redirect
    await expect(page).not.toHaveURL(/dashboard/);
  });

  test('should login successfully and redirect to client dashboard', async ({ page }) => {
    await page.goto('/login');

    await page.getByPlaceholder(/Email/i).fill(CLIENT.email);
    await page.getByPlaceholder(/Password/i).fill(CLIENT.password);
    await page.getByRole('button', { name: /Sign In/i }).click();

    // Expect redirect to client dashboard
    await expect(page).toHaveURL(/.*\/dashboard\/client/, { timeout: 15000 });
    await expect(page.getByText(/Portfolio Value/i)).toBeVisible({ timeout: 10000 });
  });

});

test.describe('Verify Email Page', () => {

  test('should render the verify page correctly', async ({ page }) => {
    await page.goto('/verify');

    await expect(page.getByRole('heading', { name: /Verify Email/i })).toBeVisible();
    await expect(page.getByPlaceholder(/6-digit Verification Code/i)).toBeVisible();
    await expect(page.getByRole('button', { name: /Verify Email/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Login/i })).toBeVisible();
  });

  test('should show error on invalid OTP format', async ({ page }) => {
    await page.goto('/verify');

    await page.getByPlaceholder(/Email Address/i).fill(CLIENT.email);
    await page.getByPlaceholder(/6-digit Verification Code/i).fill('abc');
    await page.getByRole('button', { name: /Verify Email/i }).click();

    // Should show an error message or toast
    const errorVisible = await page.getByText(/must be.*6 digit/i).isVisible({ timeout: 3000 })
      || await page.getByRole('alert').isVisible({ timeout: 3000 });
    expect(errorVisible).toBeTruthy();
  });

});
