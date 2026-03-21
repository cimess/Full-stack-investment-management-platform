import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

async function main() {
  try {
    const oldCookieJar = yf._opts.cookieJar;
    const cookieData = oldCookieJar.serializeSync();
    
    // Inject logic
    if (cookieData.cookies && Array.isArray(cookieData.cookies)) {
      for (const c of cookieData.cookies) {
        const cookieString = `${c.key}=${c.value}; Domain=${c.domain}; Path=${c.path}`;
        yf._opts.cookieJar.setCookieSync(cookieString, 'https://finance.yahoo.com/');
      }
    }
    
    // Try to use it
    const quote = await yf.quote('AAPL');
    console.log('Success! AAPL price:', quote.regularMarketPrice);
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
