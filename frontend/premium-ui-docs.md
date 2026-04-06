# CimessInvest Premium UI Guide

This document explains how to use the **Premium Theme System** defined in `premium-theme.css`. This theme is designed to mirror the high-end aesthetics of platforms like Vercel and Linear.

## 1. Typography
The system now uses **Geist** (Sans) and **Geist Mono** by default.
- **Body Text:** Use `font-sans` (the default). Use `text-slate-400` for secondary text to create professional contrast.
- **Numbers/Code:** Use `font-mono` for stock symbols or transaction hashes to make them look technical and precise.

## 2. Global CSS Variables
You can use these variables in your components for consistent coloring:
- `--bg-deep`: `#020617` (Main background)
- `--bg-surface`: `#09090b` (Card/Panel background)
- `--text-muted`: `#94a3b8` (Secondary text)
- `--accent-primary`: `#10b981` (Emerald)

## 3. Reusable Classes
Instead of long Tailwind strings, you can now use these semantic classes:

### `.premium-card`
Use this for any container that holds information (Stock cards, Charts, Stats).
- **Effect:** Subtle glass background, "glass-lip" top border, and a smooth lift animation on hover.
- **Usage:** `<div className="premium-card p-6">...</div>`

### `.premium-label`
Use this for tiny metadata titles (e.g., "MARKET CAP", "TIMESTAMP").
- **Effect:** 10px size, bold, uppercase, with wide character spacing.
- **Usage:** `<p className="premium-label">Market Cap</p>`

### `.premium-nav-item`
Use this specifically for sidebar or tab navigation links.
- **Effect:** Muted by default, high-contrast white on hover/active.
- **Usage:** `<button className="premium-nav-item active">Overview</button>`

### `.premium-text-gradient`
Use this for hero headings or important numbers.
- **Effect:** A subtle top-to-bottom white-to-gray gradient that looks like a metallic finish.
- **Usage:** `<h1 className="premium-text-gradient text-4xl">Balance</h1>`

---

## Example Component: Stock Card
```tsx
<div className="premium-card p-5">
  <div className="flex justify-between items-start">
    <div>
      <p className="premium-label">Price</p>
      <h3 className="text-xl font-bold font-mono">$154.20</h3>
    </div>
    <span className="text-emerald-400 font-medium">+2.4%</span>
  </div>
</div>
```
