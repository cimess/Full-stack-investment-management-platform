/**
 * VITEST GLOBAL SETUP
 * -------------------
 * Runs ONCE before all API tests.
 * Seeds the test database with known test users.
 */

import { runSeed } from './seed-test-users.js';

export async function setup() {
  console.log('\n🔧 Vitest Global Setup: Seeding test database...');
  await runSeed();
  console.log('🔧 Setup complete. Running tests...\n');
}
