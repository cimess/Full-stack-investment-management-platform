# 🍯 Honeycomb Query Cheat Sheet (CimessInvest)

Copy these directly into the **Honeycomb Query Builder** to see exactly how your backend is performing.

---

## 🚀 1. The "Performance Dashboard" (Basic Health)

| What you want to see | VISUALIZE (Query) | GROUP BY | FILTER |
| :--- | :--- | :--- | :--- |
| **Slowest Endpoints (P99)** | `P99(duration_ms)` | `url.path` | `url.path` exists |
| **Request Counts** | `COUNT` | `url.path` | *None* |
| **Error Rates (4xx/5xx)** | `COUNT` | `http.response.status_code` | `http.response.status_code >= 400` |
| **Cache Hit vs Miss** | `COUNT` | `app.cache_hit` | `app.cache_hit` exists |
| **Average Latency** | `AVG(duration_ms)` | `url.path` | *None* |

---

## 🗄️ 2. The "Database & Cache" (Prisma & Redis)

| What you want to see | VISUALIZE (Query) | GROUP BY | FILTER |
| :--- | :--- | :--- | :--- |
| **Slowest SQL Queries** | `P95(duration_ms)` | `db.statement` | `db.system = postgresql` |
| **Database Connections** | `HEATMAP(duration_ms)` | `db.name` | `db.connection` exists |
| **Redis Command Speed**| `AVG(duration_ms)` | `db.statement` | `db.system = redis` |

---

## 🔍 3. The "Network & Security"

| What you want to see | VISUALIZE (Query) | GROUP BY | FILTER |
| :--- | :--- | :--- | :--- |
| **Top Requesting IPs** | `COUNT` | `network.peer.ip` | *None* |
| **Method Breakdown** | `COUNT` | `http.request_method` | *None* |

---

## 💡 How to use this:
1.  Go to the **New Query** tab in Honeycomb.
2.  Paste the **VISUALIZE** field first.
3.  Add the **GROUP BY** field (this is the most important one to see "nice graphs").
4.  Optionally add the **FILTER** to narrow down to errors or database calls.
5.  Click **"Run Query"**.
6.  Click **"Add to Board"** (top right) to keep it forever!

*Tip: If you want to see the waterfall for a specific slow request, click one of the "lines" in the Data Table below the graph.*
