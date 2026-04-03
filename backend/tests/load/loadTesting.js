// import http from 'k6/http';
// import { check, sleep } from 'k6';

// export const options = {
//   vus: 150, // 50 Virtual Users
//   duration: '30s', // For 30 seconds
// };

// export default function () {
//   // Simulate user hitting the health check
//   let res = http.get('https://full-stack-investment-management-platform.onrender.com/api/health');
//   check(res, { 'status is 200': (r) => r.status === 200 });
  
//   sleep(1); // User waits 1 second
  
// //   // Simulate hitting market quotes
// //   let quotes = http.get('http://localhost:4000/api/market/quotes');
// //   check(quotes, { 'fetched quotes': (r) => r.status === 200 });
  
// //   sleep(2);
// }

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics
export let nodeProcessing = new Trend('node_processing_ms');
export let loopLag = new Trend('event_loop_lag_ms');
export let failedRequests = new Rate('failed_requests');

export const options = {
  vus: 50,           // Max virtual users
  duration: '30s',   // Total test duration
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    failed_requests: ['rate<0.05'],   // Less than 5% failed
  },
};

export default function () {
  // Make request to health endpoint
  let res = http.get('https://api.cimessinvest.com/api/health', {
    headers: {
      'Origin': 'https://cimessinvest.com',
      'Connection': 'keep-alive',  // Avoid repeated TLS handshake overhead
    },
  });

  // Example: if Node returns internal timing headers
  const nodeTime = parseFloat(res.headers['x-node-time-ms']) || 0;
  const loopTime = parseFloat(res.headers['x-event-loop-ms']) || 0;

  nodeProcessing.add(nodeTime);
  loopLag.add(loopTime);

  // Checks
  const result = check(res, {
    'status is 200': (r) => r.status === 200,
  });

  failedRequests.add(!result);

  // Optional sleep to simulate user think time
  sleep(1);
}
