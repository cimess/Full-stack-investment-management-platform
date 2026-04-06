# 🚀 CimessInvest: Professional Asset Management Platform

## 📸 Screenshots
[<img src="https://github.com/user-attachments/assets/d00eaa61-424a-4b65-8de6-b878e3af5cb6" width="700"/>](https://github.com/user-attachments/assets/d00eaa61-424a-4b65-8de6-b878e3af5cb6)

[<img src="https://github.com/user-attachments/assets/c8f4c6eb-a29c-4dc8-b139-ce7ff9b2c98e" width="700" alt="CimessInvest Dashboard Screenshot"/>](https://github.com/user-attachments/assets/c8f4c6eb-a29c-4dc8-b139-ce7ff9b2c98e)

**CimessInvest** is a high-performance, full-stack investment management platform designed for modern investors, portfolio managers, and administrators. It combines real-time financial data with sophisticated analytics and a rock-solid security layer.

---

## ✨ Features

### 👤 Role-Based Dashboards
-   **Client Dashboard**: Monitor portfolio performance with real-time charts, detailed transaction history, and direct manager communication.
-   **Manager Dashboard**: Oversee multiple client portfolios, approve/reject trade requests, and track managed Asset Under Management (AUM).
-   **Admin Dashboard**: Maintain platform health, manage user/manager restrictions, and monitor global trade volumes.

### 📈 Advanced Trading Experience (New)
-   **Persistent Searchable Trading**: A professional-grade asset selection modal with real-time alphabetically sorted results and instant filtering.
-   **Integrated Transaction Review**: A mandatory review step provides a comprehensive financial summary before final trade confirmation, ensuring user confidence.
-   **Real-time Estimation**: Live calculation of total trade costs and portfolio impacts as users adjust order quantities.

### 🛡️ Security & Privacy
-   **Soft-Delete Account Deactivation**: Secure account disabling feature that preserves data integrity while preventing unauthorized access and invalidating active sessions.
-   **OAuth 2.0 Integration**: Secure Google authentication with server-side proxying for session persistence.
-   **JWT-based Permissions**: Granular access control for clients, managers, and admins.

---

## ⚡ Engineering Excellence (The "Wow" Factor)

This project implements production-grade engineering patterns to ensure extreme performance:

-   **Deep Black Design System**: A premium, high-contrast UI (Pure #000000) utilizing glassmorphism, consistent Lucide icon weight (1.5px), and optimized mobile responsiveness.
-   **DOM Virtualization**: Powered by `@tanstack/react-virtual`, ensuring fluid performance even with 10,000+ transactions or stocks.
-   **Multithreaded Processing (Web Workers)**: Offloads heavy financial calculations and 7-day trend processing to background threads to prevent UI jank.
-   **Predictive Navigation**: Intelligent prefetching via TanStack Query to eliminate perceived latency during navigation.

---

## 🛠 Tech Stack

**Frontend:**
-   **Core**: React + TypeScript + Vite
-   **Styling**: Vanilla CSS + Tailwind (Custom Glassmorphic System)
-   **State**: TanStack Query (React Query)
-   **Icons**: Lucide React
-   **Toasts**: React-Toastify (Custom mobile-optimized)

**Backend:**
-   **Runtime**: Node.js + Express
-   **ORM**: Prisma
-   **Database**: PostgreSQL
-   **Authentication**: Passport.js + JWT

---

## 🚀 Getting Started

### Prerequisites
-   Node.js v18+
-   PostgreSQL Database

### Setup

1.  **Clone Global Repository**:
    ```bash
    git clone https://github.com/cimess/Novalinvest.git
    cd cimessinvest
    ```

2.  **Backend Setup**:
    ```bash
    cd backend
    npm install
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
Distributed under the MIT License.

**Developed with ❤️ by [THANKGOD AIMUAN] (cimessdev)**
*Showcasing next-generation web performance and full-stack architecture.*
