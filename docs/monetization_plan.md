# Monetization & Pricing Strategy Roadmap

To turn NovaInvest into a sustainable business, you need a clear pricing structure that converts "Casual Users" into "Pro Traders" and "Professional Managers."

## 1. The Pricing Tiers (The "Ladder")

### Tier 1: Free (The "Hook")
*Target: Beginners & Curious Users.*
- **Features:**
    - Real-time price tracking for top 20 assets.
    - Basic portfolio visualization (Pie charts).
    - Daily Gain/Loss alerts.
    - Standard community access.

### Tier 2: Pro ($19 - $29 / month)
*Target: Active Retail Investors.*
- **Features:**
    - **Advanced Technical Analysis:** Full-screen candlestick charts with 50+ indicators.
    - **AI Portfolio Assistant:** 24/7 chat support for financial news and summaries.
    - **Sentiment Tracking:** Social media fear/greed scores for every asset.
    - **Unlimited Watchlists:** No cap on tracked stocks or cryptos.

### Tier 3: Manager ($99 - $199 / month)
*Target: Wealth Managers & Funds.*
- **Features:**
    - **Risk Analytics:** Sharpe Ratio, Sortino Ratio, and Value at Risk (VaR).
    - **Order Flow Data:** Level 2 market depth and institutional block trade tracking.
    - **Client Management:** Tools to manage and track multiple user portfolios from one dash.
    - **Priority Support:** Direct line to platform admins.

---

## 2. Platform Monetization Methods (Multiple Streams)

### A. Subscription Revenue (SaaS)
The core recurring revenue model using monthly/yearly billing.
- **Tool:** **Stripe** or **LemonSqueezy** (best for global SaaS).

### B. Transaction Fees (The "Broker" Model)
If you facilitate trades through the platform, you take a small cut (e.g., 0.1% or 0.2%).
- **Implementation:** Integrated into the trade execution logic.

### C. Lead Generation for Managers
Allowing Managers to find new Clients on your platform. You charge a "Platform Fee" for every connection made or a percentage of the manager's successful trades (High-end model).

### D. API Access (Data as a Service)
Selling your cleaned and analyzed data (Sentiment + AI summaries) via an API to other developers.

---

## 3. Technical Implementation Stack

### Payments & Billing
- **Stripe Node SDK**: The gold standard for handling subscriptions, cards, and tax.
- **Stripe Webhooks**: Deeply critical for updating a user's status in your database when a payment succeeds or fails.

### Database Design (Prisma)
- **User Model:** Add `subscriptionTier` enum (FREE, PRO, MANAGER).
- **Billing Model:** Store `stripeCustomerId`, `subscriptionStatus`, and `nextBillingDate`.

---

## 4. Development Roadmap (Revenue Focus)

### Phase 1: The Billing Bridge (Short-term)
- [ ] Set up a **Stripe Account** and create your Products/Prices.
- [ ] Implement a **Pricing Page** in the frontend with beautiful "Glassmorphism" cards.
- [ ] Connect the **Stripe Checkout** to your platform.

### Phase 2: Feature Gating (Mid-term)
- [ ] Create a `PermissionGuard` in React to hide Pro features from Free users.
- [ ] Implement **Stripe Webhooks** on the backend to automatically unlock features.
- [ ] Build a **Billing Dashboard** where users can manage their cards and cancel.

### Phase 3: Scaling & Analytics (Long-term)
- [ ] Add **Annual Discounting** (e.g., "Pay for a year, get 2 months free").
- [ ] Implement **Coupon Codes** for marketing campaigns.
- [ ] Build a **Revenue Dashboard** for the Admin to track MRR (Monthly Recurring Revenue).
