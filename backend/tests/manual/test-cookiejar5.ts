import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

async function main() {
  try {
    const oldCookieJar = yf._opts.cookieJar;
    const cookieData = oldCookieJar.serializeSync();
    
    // Replace the cookie jar
    yf._opts.cookieJar = oldCookieJar.constructor.deserializeSync(cookieData);
    
    // Try to use it
    const quote = await yf.quote('AAPL');
    console.log('Success! AAPL price:', quote.regularMarketPrice);
  } catch (error) {
    console.error('Failed:', error);
  }
}

main();
