import { prisma } from './lib/prisma.js';

async function main() {
  const count = await prisma.stockTable.count();
  console.log(`Stocks in DB: ${count}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
