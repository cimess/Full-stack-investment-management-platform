/**
 * PLAYWRIGHT GLOBAL SETUP
 * -----------------------
 * Runs ONCE before all E2E tests.
 * 
 * 1. Seeds test users into the database (runs the backend seed script)
 * 2. Logs in as the CLIENT test user using the real backend
 * 3. Saves the auth cookies to tests/setup/client-auth.json
 * 4. All test files that need auth just load `storageState: CLIENT_AUTH_FILE`
 *    so they skip the login UI entirely — faster and more reliable.
 */

import { chromium, FullConfig } from '@playwright/test';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const CLIENT_AUTH_FILE = path.join(__dirname, 'client-auth.json');

async function globalSetup(config: FullConfig) {
  console.log('\n🌱 [Playwright Global Setup] Seeding test users...');

  // Run the seed script in the backend
  try {
    const backendPath = path.resolve(__dirname, '../../../backend');
    console.log(`📂 Executing seed in: ${backendPath}`);
    
    execSync('npm run test:seed', {
      cwd: backendPath,
      stdio: 'inherit',
      shell: true, // Use system shell
    });
  } catch (err) {
    console.error('❌ Seed script failed:', err);
    throw err;
  }

  // Login as client and store auth cookies
  console.log('🔐 [Playwright Global Setup] Logging in as test client...');
  const browser = await chromium.launch();
  const context = await browser.newContext({
    baseURL: config.projects[0].use.baseURL,
  });
  const page = await context.newPage();

  await page.goto('/login');

  // Fill in login form using the seeded client credentials
  await page.getByPlaceholder(/Email/i).fill('testclient@novainvest.test');
  await page.getByPlaceholder(/Password/i).fill('TestPass123!');
  await page.getByRole('button', { name: /Sign In/i }).click();

  // Wait until we are redirected to ANY dashboard (client, manager, or admin)
  console.log('⌛ [Playwright Global Setup] Waiting for redirection...');
  // Use a more flexible regex and longer timeout
  try {
    await page.waitForURL(url => url.pathname.includes('/dashboard'), { timeout: 30000 });
    console.log(`📍 [Playwright Global Setup] Current URL: ${page.url()}`);
  } catch (err) {
    console.error(`❌ [Playwright Global Setup] Failed to redirect. Current URL: ${page.url()}`);
    throw err;
  }

  // Save the authenticated session state (cookies) to disk
  await context.storageState({ path: CLIENT_AUTH_FILE });
  await browser.close();

  console.log('✅ [Playwright Global Setup] Auth state saved. Tests are ready.\n');
}

export default globalSetup;
