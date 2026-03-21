import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

console.log(typeof yf._opts.cookieJar.constructor.deserializeSync);
console.log(typeof yf._opts.cookieJar.setCookieSync);
