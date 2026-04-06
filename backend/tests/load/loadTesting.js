
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend, Rate } from 'k6/metrics';

// Custom metrics for backend analysis
export let nodeProcessing = new Trend('node_processing_ms');
export let loopLag = new Trend('event_loop_lag_ms');
export let failedRequests = new Rate('failed_requests');

export const options = {
    vus: 5,           // 3 Concurrent users as requested
    duration: '30s',   // 30 Seconds duration
    thresholds: {
        http_req_duration: ['p(95)<1000'], // 95% of requests should be < 1s
        failed_requests: ['rate<0.01'],   // Less than 1% failed
    },
};

const BASE_URL = 'https://full-stack-investment-management-platform.onrender.com'; // Default to local, user can override

// Test users from seed-test-users.ts
const USERS = [
    { email: 'cimessthemanofvalor@gmail.com', password: 'Password25825800.', role: 'ADMIN' },
    { email: 'cmhous@gmail.com', password: 'Password25825800.', role: 'CLIENT' },
    { email: 'cimess258258@gmail.com', password: 'Password25825800.', role: 'MANAGER' },
    { email: 'cimesstttttt@gmail.com', password: 'Password25825800.', role: 'CLIENT' },
    { email: 'cmhousdds@gmail.com', password: 'Password25825800.', role: 'CLIENT' },
];

export default function () {
    // Pick a user based on VU ID (1-indexed in k6)
    const userIndex = (__VU - 1) % USERS.length;
    const user = USERS[userIndex];

    const headers = {
        'Content-Type': 'application/json',
        'Connection': 'keep-alive'
    };

    // --- 1. LOGIN ---
    // Note: k6 handles HTTP-only cookies automatically, so subsequent requests will be authenticated.
    const loginPayload = JSON.stringify({
        email: user.email,
        password: user.password
    });

    let loginRes = http.post(`${BASE_URL}/api/login`, loginPayload, { headers });

    const loginOk = check(loginRes, {
        'Login success (200)': (r) => r.status === 200,
        'Has access token cookie': (r) => r.cookies['accessToken'] !== undefined,
    });

    if (!loginOk) {
        failedRequests.add(1);
        console.error(`Login failed for ${user.email}: ${loginRes.status} ${loginRes.body}`);
        sleep(5);
        return;
    }

    // Think time after login
    sleep(1);

    // --- 2. GET ME (User details) ---
    let meRes = http.get(`${BASE_URL}/api/get/me`, { headers });
    check(meRes, { 'Fetched profile (200)': (r) => r.status === 200 });
    
    // --- 3. FETCH MARKET QUOTES ---
    // This is likely cached in Redis, so we expect very low latency here.
    let quotesRes = http.get(`${BASE_URL}/api/market/quotes`, { headers });

    // Track backend-specific performance metrics from headers
    const nodeTime = parseFloat(quotesRes.headers['X-Node-Time-Ms']) || 0;
    const loopTime = parseFloat(quotesRes.headers['X-Event-Loop-Ms']) || 0;
    if (nodeTime > 0) nodeProcessing.add(nodeTime);
    if (loopTime > 0) loopLag.add(loopTime);

    const quotesOk = check(quotesRes, {
        'Market quotes fetched (200)': (r) => r.status === 200,
        'Quotes list not empty': (r) => JSON.parse(r.body).data?.length > 0,
    });
    failedRequests.add(!quotesOk);

    sleep(2);

    // --- 4. FETCH DASHBOARD (Role-specific) ---
    let dashboardUrl = `${BASE_URL}/api/client/dashboard`;
    if (user.role === 'MANAGER') dashboardUrl = `${BASE_URL}/api/manager/dashboard`;
    if (user.role === 'ADMIN') dashboardUrl = `${BASE_URL}/api/admin/dashboard`;

    let dashRes = http.get(dashboardUrl, { headers });
    check(dashRes, { 'Dashboard fetched (200)': (r) => r.status === 200 });

    failedRequests.add(dashRes.status !== 200);

    // Think time before next iteration
    sleep(3);
}

// npx clinic flame -- node --import tsx server.ts
