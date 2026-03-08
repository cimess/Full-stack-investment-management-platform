import { defineConfig, devices } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  testDir: './tests',
  
  // ── Run order ───────────────────────────────────────────────────────────────
  // auth.spec runs first (tests login page), all others use saved auth state
  fullyParallel: false,
  
  // ── Retries ─────────────────────────────────────────────────────────────────
  retries: process.env.CI ? 2 : 1,
  workers: 1, // sequential — we share a real backend and DB

  // ── Reporting ────────────────────────────────────────────────────────────────
  reporter: [['html', { open: 'never' }], ['list']],

  // ── Shared settings ──────────────────────────────────────────────────────────
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
  },

  // ── Browsers ─────────────────────────────────────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // ── Global setup ─────────────────────────────────────────────────────────────
  // Seeds DB + saves login cookies ONCE before any test runs
  globalSetup: './tests/setup/global-setup.ts',

  // ── Dev server ───────────────────────────────────────────────────────────────
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
    timeout: 60_000,
  },
});
