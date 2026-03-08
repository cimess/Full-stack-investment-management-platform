import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Tests are in backend/tests/api/
    include: ['tests/api/**/*.test.ts'],
    // Run tests sequentially (we're hitting a real server, not isolated)
    // Run tests sequentially
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    // Note: If you get a warning about poolOptions, it might need to move to top level in newer Vitest
    // but for now let's keep it as per common stable configs unless error persists.
    // Wait, the error message said it was removed. Let's try to remove it as requested.

    // Add a global timeout for API calls
    testTimeout: 15000,
    hookTimeout: 10000,
    // Pretty reporter
    reporter: 'verbose',
    // globalSetup runs before ALL test files
    globalSetup: ['./tests/setup/vitest-global-setup.ts'],
    // setupFiles runs before EACH test file
    setupFiles: ['./tests/setup/vitest.setup.ts'],
  },
});
