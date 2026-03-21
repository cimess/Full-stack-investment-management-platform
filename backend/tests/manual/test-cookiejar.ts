import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

console.log(typeof yf._opts.cookieJar.fromJSON);
console.log(Object.keys(yf._opts.cookieJar));
console.log(yf._opts.cookieJar.constructor.name);
console.log(typeof yf._opts.cookieJar.serializeSync);
