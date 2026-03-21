async function main() {
  try {
    const res = await fetch('https://api.coincap.io/v2/assets?limit=5');
    const data = await res.json();
    const symbols = data.data.map((coin: any) => `${coin.symbol}-USD`);
    console.log('Top 5 Crypto Symbols for Yahoo:', symbols);
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
