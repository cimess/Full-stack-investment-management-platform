import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 50, // 50 Virtual Users
  duration: '30s', // For 30 seconds
};

export default function () {
  // Simulate user hitting the health check
  let res = http.get('http://localhost:5000/api/health');
  check(res, { 'status is 200': (r) => r.status === 200 });
  
  sleep(1); // User waits 1 second
  
  // Simulate hitting market quotes
  let quotes = http.get('http://localhost:5000/api/market/quotes');
  check(quotes, { 'fetched quotes': (r) => r.status === 200 });
  
  sleep(2);
}
