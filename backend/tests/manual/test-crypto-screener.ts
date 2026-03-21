import YahooFinance from 'yahoo-finance2';
const yahooFinance = new YahooFinance();

async function main() {
  try {
    const url = 'https://query2.finance.yahoo.com/v1/finance/screener/predefined/saved?formatted=false&lang=en-US&region=US&scrIds=all_cryptocurrencies_us&count=5';
    const res = await (yahooFinance as any)._fetch(url);
    const data = await res.json();
    console.log(`Found ${data.finance?.result?.[0]?.quotes?.length} crypto symbols!`);
    console.log(data.finance?.result?.[0]?.quotes?.map((q: any) => q.symbol));
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
