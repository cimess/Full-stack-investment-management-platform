import YahooFinance from 'yahoo-finance2';
const yf = new YahooFinance();

const cookieDataStr = '{"version":"tough-cookie@4.1.4","storeType":"MemoryCookieStore","rejectPublicSuffixes":true,"cookies":[]}';
const cookieData = JSON.parse(cookieDataStr);

console.log('Before:', yf._opts.cookieJar.constructor.name);
yf._opts.cookieJar = yf._opts.cookieJar.constructor.deserializeSync(cookieData);
console.log('After:', yf._opts.cookieJar.constructor.name);
