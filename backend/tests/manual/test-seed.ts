import { seedTopSymbols } from './services/marketservice.js';
import { prisma } from './lib/prisma.js';

async function main() {
  console.log('Starting manual seed script...');
  await seedTopSymbols();
  const count = await prisma.stockTable.count();
  console.log(`Stocks in DB after seeding: ${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
