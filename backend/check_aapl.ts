import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const stock = await prisma.stockTable.findUnique({
    where: { symbol: 'AAPL' }
  });
  console.log(JSON.stringify(stock, (key, value) =>
    typeof value === 'bigint' ? value.toString() : value
  , 2));
}
main().catch(console.error).finally(() => prisma.$disconnect());
