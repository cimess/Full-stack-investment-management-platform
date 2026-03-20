# 🚀 CimessInvest: Professional Asset Management Platform

## 📸 Screenshots

### NovaInvest App
![NovaInvest Screenshot](./app/Screenshot%202026-03-20%20at%2015-44-02%20NovaInvest%20-%20The%20Future%20of%20Wealth.png)


**CimessInvest** is a high-performance, full-stack investment management platform designed for modern investors, portfolio managers, and administrators. It combines real-time financial data with sophisticated analytics and a rock-solid security layer.
**website**: https://cimessinvest.com

---

## ✨ Features

### 👤 Role-Based Dashboards
-   **Client Dashboard**: Monitor portfolio performance with real-time charts, detailed transaction history, and direct manager communication.
-   **Manager Dashboard**: Oversee multiple client portfolios, approve/reject trade requests, and track managed Asset Under Management (AUM).
-   **Admin Dashboard**: Maintain platform health, manage user/manager restrictions, and monitor global trade volumes.

### 📈 Intelligent Portfolio Tracking
-   **Real-time Stock Exploration**: Fast search and live data for global stock markets.
-   **Performance Analytics**: Multi-threaded calculations offloaded to background workers to keep the UI smooth during heavy 7-day trend processing.
-   **Automated Trade Logging**: Comprehensive history for every buy/sell action.

---

## ⚡ Engineering Excellence (The "Wow" Factor)

This project isn't just a basic React app. It implements production-grade engineering patterns to ensure extreme performance:

-   **DOM Virtualization**: Powered by `@tanstack/react-virtual`. Even with 10,000+ transactions or stocks, the UI remains perfectly fluid by only rendering what's visible on screen.
-   **Multithreaded Processing (Web Workers)**: Heavy financial calculations (AUM totals, trend lines, and data reduction) are offloaded to background worker threads, preventing "Main Thread" jank and keeping the UI interactive.
-   **Predictive Navigation (Prefetching)**: Integrated `onMouseEnter` prefetching via TanStack Query. The app predicts where you're going and starts loading data before you even click, resulting in a "Zero-latency" feeling.
-   **Secure OAuth Proxying**: Architecture-level fix using Netlify Proxies to facilitate secure, Cross-Site session persistence with `sameSite: "lax"`.

---

## 🛠 Tech Stack

**Frontend:**
-   **Core**: React + TypeScript + Vite
-   **Styling**: TailwindCSS (Modern, responsive, glassmorphic design)
-   **State & Data**: TanStack Query (React Query)
-   **Virtualization**: TanStack Virtual
-   **Charts**: Recharts (Custom themed)
-   **Icons**: Lucide React

**Backend:**
-   **Runtime**: Node.js + Express
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Authentication**: Passport.js (Google OAuth 2.0) & JWT
-   **Security**: Helmet, Rate Limiting, Winston Logging

---

## 🚀 Getting Started

### Prerequisites
-   Node.js v18+
-   PostgreSQL Database

### Setup

1.  **Clone the Repository**:
    ```bash
    git clone https://github.com/cimess/Novalinvest.git
    cd novainvest
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
    cp .env.example .env # Add your DB URL and Google OAuth Keys
    npx prisma generate
    npx prisma migrate dev
    npm run dev
    ```

3.  **Frontend Setup**:
    ```bash
    cd ../frontend
    npm install
    npm run dev
    ```

---

## 🛡️ License
Distributed under the MIT License. See `LICENSE` for more information.

---

**Developed with ❤️ by cimessdev[THANKGOD AIMUAN]
*Showcasing next-generation web performance and full-stack architecture.*
