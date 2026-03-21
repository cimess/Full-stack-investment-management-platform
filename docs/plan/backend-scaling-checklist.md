# NovaInvest Backend Scaling & Optimization Checklist

This document outlines the roadmap for maturing the NovaInvest backend to handle more users, real-time data, and complex financial analytics.

## 1. Database & Persistence (Prisma/Postgres)
- [/] **Connection Pooling**: Implement `Prisma Accelerate` or `PgBouncer` (on Render) to prevent "Too many connections" errors during traffic spikes.
- [ ] **Strategic Indexing**: 
    - Add explicit indices to `Transaction(createdAt)`, `Notification(user_id, read)`, and `StockTable(lastUpdated)`.
    - Audit query plans for the "Portfolio Performance" charts.
- [ ] **Data Retention Policy**: Implement a worker task to archive or delete notifications older than 30 days to keep the `Notification` table lean.
- [ ] **Read/Write Splitting**: (Long term) Separate read replicas for heavy analytical queries (like manager reports).

## 2. API Performance & Caching
- [ ] **Redis Integration**:
    - Cache `marketQuotes` for 60 seconds to reduce load on the `StockTable` and downstream APIs.
    - Implement a "User Session Cache" to avoid repeated `findUnique` calls for the current user object.
- [ ] **Response Compression**: Enable `compression` middleware in Express to reduce payload sizes for large transaction histories.
- [ ] **Global JSON BigInt Middleware**: Move the BigInt → String conversion from controllers to a global Express middleware or a Prisma middleware.

## 3. Worker & Task Architecture
- [ ] **Worker Separation**: Move `marketWorker.ts` and `analytics` from the main API process to a dedicated background worker "Service" (Horizontal Scaling).
- [ ] **Message Queue (BullMQ/Redis)**:
    - Move email sending (`sendEmail`) to a background queue.
    - Move heavy trade processing to a queue to ensure "At-least-once" delivery and retry logic.

## 4. Security & Robustness
- [ ] **Advanced Rate Limiting**: Implement per-user rate limits (not just IP) to prevent malicious bots from scraping stock data.
- [ ] **Idempotency Keys**: Implement idempotency for `/buy` and `/sell` routes to prevent accidental double-trades if a user clicks twice or the network glitches.
- [ ] **Audit Logs**: Create an `AuditLog` table to track high-privilege actions (Admin/Manager changes) for compliance.

## 5. Monitoring (APM)
- [ ] **Sentry Integration**: Track backend errors and performance bottlenecks in real-time.
- [ ] **Health Check Probing**: Expand `/api/health` to check DB connectivity and worker status.

---

# 📚 Knowledge Base: How Backend Systems Scale

### 1. Vertical vs Horizontal Scaling
*   **Vertical (Scaling Up)**: Adding more RAM/CPU to your existing server (e.g., upgrading your Render plan). It's easy but has a "ceiling."
*   **Horizontal (Scaling Out)**: Adding **more servers** and putting a **Load Balancer** (like Nginx or AWS ALB) in front of them. This is how Google/Netflix scale infinitely.

### 2. Database Scaling Strategies
*   **Read Replicas**: You have one master DB for writing data, and multiple "follower" DBs for reading. Great for apps like NovaInvest where users read their dashboard more than they trade.
*   **Database Sharding**: Splitting your database by user ID (e.g., Users A-M on Server 1, N-Z on Server 2).
*   **Connection Pooling**: Using a "Manager" (like PgBouncer) to share a few DB connections among hundreds of API requests.

### 3. Asynchronous Scaling (Message Queues)
Instead of making a user wait for an email to be sent, you drop a "Ticket" into a **Message Queue** (like Redis + BullMQ). A separate **Worker** picks it up later. This keeps your API lightning fast.

### 4. Caching Layers
*   **In-Memory (Redis)**: Storing frequently accessed data (like live stock prices) in RAM so you don't hit the slow Database every time.
*   **Edge Caching**: Storing your API responses at the "Edge" (geographic locations near the user) using Cloudflare or Fastly.
