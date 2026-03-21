async function main() {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/price');
    const data = await res.json();
    const usdtPairs = data.filter((p: any) => p.symbol.endsWith('USDT')).slice(0, 500);
    const symbols = usdtPairs.map((coin: any) => `${coin.symbol.replace('USDT', '')}-USD`);
    console.log(`Found ${symbols.length} Crypto Symbols for Yahoo!`);
    console.log(symbols.slice(0, 5));
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
