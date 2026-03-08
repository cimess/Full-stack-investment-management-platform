/**
 * SEED TEST USERS
 * ---------------
 * Creates known test accounts in the database for all test suites.
 * This script is run automatically before tests.
 * 
 * TEST ACCOUNTS CREATED:
 *  - Client  — testclient@novainvest.test  / TestPass123!
 *  - Manager — testmanager@novainvest.test / TestPass123!  (has approval_code: TEST-MGR-001)
 *  - Admin   — testadmin@novainvest.test   / TestPass123!
 */

import { prisma } from '../../lib/prisma.js';
import bcrypt from 'bcrypt';

export const TEST_CREDENTIALS = {
  client: {
    email: 'testclient@novainvest.test',
    password: 'TestPass123!',
  },
  manager: {
    email: 'testmanager@novainvest.test',
    password: 'TestPass123!',
    approvalCode: 'TEST-MGR-001',
  },
  admin: {
    email: 'testadmin@novainvest.test',
    password: 'TestPass123!',
  },
};

async function seedTestUsers() {
  const hashedPassword = await bcrypt.hash('TestPass123!', 10);

  console.log('🌱 Clearing existing test data...');
  // Order matters due to foreign keys
  await prisma.trade_request.deleteMany({});
  await prisma.investment.deleteMany({});
  await prisma.refreshToken.deleteMany({});
  await prisma.portfolio.deleteMany({});
  
  console.log('🌱 Seeding test users into the database...');

  // ── CLIENT USER ──────────────────────────────────────────────
  const clientUser = await prisma.user.upsert({
    where: { email: TEST_CREDENTIALS.client.email },
    update: {},
    create: {
      email: TEST_CREDENTIALS.client.email,
      username: 'test_client_user',
      password: hashedPassword,
      fullname: 'Test Client',
      roles: 'USER',
      isVerified: true,
    },
  });

  // Every client needs a portfolio
  await prisma.portfolio.upsert({
    where: { id: `test-portfolio-${clientUser.id}` },
    update: {},
    create: {
      id: `test-portfolio-${clientUser.id}`,
      user_id: clientUser.id,
    },
  });

  console.log(`  ✅ Client  → ${TEST_CREDENTIALS.client.email}`);

  // ── MANAGER USER ─────────────────────────────────────────────
  const managerUser = await prisma.user.upsert({
    where: { email: TEST_CREDENTIALS.manager.email },
    update: {},
    create: {
      email: TEST_CREDENTIALS.manager.email,
      username: 'test_manager_user',
      password: hashedPassword,
      fullname: 'Test Manager',
      roles: 'MANAGER',
      isVerified: true,
    },
  });

  await prisma.manager.upsert({
    where: { manager_id: managerUser.id },
    update: {},
    create: {
      manager_id: managerUser.id,
      approval_code: TEST_CREDENTIALS.manager.approvalCode,
      manager_slot: 10,
    },
  });

  console.log(`  ✅ Manager → ${TEST_CREDENTIALS.manager.email}`);

  // ── ADMIN USER ───────────────────────────────────────────────
  const adminUser = await prisma.user.upsert({
    where: { email: TEST_CREDENTIALS.admin.email },
    update: {},
    create: {
      email: TEST_CREDENTIALS.admin.email,
      username: 'test_admin_user',
      password: hashedPassword,
      fullname: 'Test Admin',
      roles: 'ADMIN',
      isVerified: true,
    },
  });

  await prisma.admin.upsert({
    where: { user_id: adminUser.id },
    update: {},
    create: {
      user_id: adminUser.id,
      super_admin: true,
    },
  });

  console.log(`  ✅ Admin   → ${TEST_CREDENTIALS.admin.email}`);

  // ── TEST STOCK ───────────────────────────────────────────────
  const testStock = await prisma.stockTable.upsert({
    where: { symbol: 'AAPL' },
    update: {},
    create: {
      symbol: 'AAPL',
      company: 'Apple Inc.',
      price: 150.00,
      changePercent: 1.2,
      currency: 'USD'
    },
  });
  console.log(`  ✅ Stock   → ${testStock.symbol} (ID: ${testStock.id})`);

  console.log('🌱 Seeding complete.\n');
}

export async function runSeed() {
  try {
    await seedTestUsers();
  } finally {
    await prisma.$disconnect();
  }
}

// Run directly: tsx backend/tests/setup/seed-test-users.ts
if (process.argv[1]?.endsWith('seed-test-users.ts')) {
  runSeed().catch(console.error);
}
