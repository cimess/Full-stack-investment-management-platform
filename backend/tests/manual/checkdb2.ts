import { prisma } from './lib/prisma.js';

async function main() {
  const stocks = await prisma.stockTable.findMany();
  const cryptos = stocks.filter(s => s.symbol.includes('-USD'));
  console.log(`Stocks in DB: ${stocks.length}`);
  console.log(`Crypto: ${cryptos.length}, Regular: ${stocks.length - cryptos.length}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
