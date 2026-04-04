

import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics
export let nodeProcessing = new Trend('node_processing_ms');
export let loopLag = new Trend('event_loop_lag_ms');
export let failedRequests = new Rate('failed_requests');

export const options = {
    vus: 10,           // Simulating 10 users as requested
    duration: '30s',   // Total test duration
    thresholds: {
        http_req_duration: ['p(95)<1000'], // Adjusted to 1s given production latency overhead
        failed_requests: ['rate<0.05'],   // Less than 5% failed
    },
};

const BASE_URL = 'http://localhost:4000';

// 'https://full-stack-investment-management-platform.onrender.com';
// Compress timestamp + random + VU + iteration into 19 chars
function generateUniqueId() {
    // Get current timestamp in ms and convert to base36 (shorter)
    const timePart = Date.now().toString(36); // ~8 chars now

    // Random part in base36, enough entropy for uniqueness
    const randomPart = Math.floor(Math.random() * 1e9).toString(36); // ~6 chars

    // VU + iteration combined, compressed
    const vuIterPart = (__VU * 10000 + __ITER).toString(36); // ~5 chars max

    // Concatenate all parts
    return (timePart + randomPart + vuIterPart).slice(0, 19); // ensure max 19 chars
}




export default function () {
    // Generate a unique user per Virtual User (VU) and Iteration
    const uniqueId = generateUniqueId();

    // --- 1. REGISTER USER ---
    // We register first. Because this is a real browser simulation,
    // k6 automatically reads the 'Set-Cookie' header from the response 
    // and stores your HTTP-only 'accessToken' cookie in its internal jar.
    const payload = JSON.stringify({
        name: 'Load Tester',
        username: `${uniqueId}`,
        email: `loadtest_${uniqueId}@cimessinvest.com`,
        password: 'Password123!',
        role: 'CLIENT'
    });

    const headers = {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173',
        'Connection': 'keep-alive'
    };

    let regRes = http.post(`${BASE_URL}/api/register`, payload, { headers });

    const regResult = check(regRes, {
        'Registration OK (201)': (r) => r.status === 201,
    });
    failedRequests.add(!regResult);

    // Think time after registering
    sleep(1);

    // --- 2. HIT PROTECTED ENDPOINT ---
    // No need to pass tokens manually! k6 attaches the saved access cookie here automatically.
    let quotesRes = http.get(`${BASE_URL}/api/market/quotes`, { headers });

    // Extract custom monitoring headers added in server.ts
    const nodeTime = parseFloat(quotesRes.headers['X-Node-Time-Ms']) || 0;
    const loopTime = parseFloat(quotesRes.headers['X-Event-Loop-Ms']) || 0;

    if (nodeTime > 0) nodeProcessing.add(nodeTime);
    if (loopTime > 0) loopLag.add(loopTime);

    const quoteResult = check(quotesRes, {
        'Market quotes fetched (200)': (r) => r.status === 200,
    });
    failedRequests.add(!quoteResult);

    // Think time after scrolling market quotes
    sleep(2);
}

// npx clinic flame -- node --import tsx server.ts
