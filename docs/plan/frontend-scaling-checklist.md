# Frontend Scaling & Optimization Checklist

As your React SPA grows, check off these items as they are implemented in the project.

### Phase 1: Bundle Size & Initial Load (TTI)
- [ ] **Route-Level Code Splitting**: Use `React.lazy()` and `<Suspense>` in `App.tsx` or router.
- [ ] **Asset Optimization**: Serve modern WebP image formats, potentially utilizing Netlify Image CDN or Vite plugins.
- [ ] **Remove Heavy Dependencies**: Audit `package.json` for unnecessarily large packages (e.g. check moment.js alternatives).

### Phase 2: Memory & DOM Rendering
- [ ] **DOM Virtualization (List Windowing)**: Use `@tanstack/react-virtual` for any UI rendering more than 50 rows (e.g. Transactions list, Global Market Table).
- [ ] **Web Workers**: Move heavy Recharts data transformations or large array filtering to a background Web Worker thread.

### Phase 3: State & React Rendering
- [ ] **Precise Client State Management**: Migrate volatile global state from React Context to `zustand`.
- [ ] **Data Prefetching**: Use React Query's `prefetchQuery` on navigation link `onMouseEnter` events to load data before the user even clicks.

---

**Prior Optimizations (Already Done!)**
- [x] **Global CDN + Edge Caching:** Handled via Netlify.
- [x] **Build Optimization:** Handled by Vite (minification, tree-shaking).
- [x] **Cache API Calls:** Handled via React Query (`@tanstack/react-query`).
- [x] **Security Headers:** Handled securely on backend via Helmet, CORS.

---

# 📚 Knowledge Base: How Frontend Systems Scale

### 1. Delivery & Distribution (CDN)
The most important frontend scaling is moving files closer to the user. Using a **CDN (Content Delivery Network)** like Netlify or Cloudflare ensures your React app is served from a server physically near your user.

### 2. Rendering Patterns
*   **CSR (Client-Side Rendering)**: What we use now. Fast transitions, but heavy initial JS bundle.
*   **SSR (Server-Side Rendering)**: Render the HTML on the server (like Next.js) so the user sees content instantly. Great for SEO.
*   **SSG (Static Site Generation)**: Pre-build all pages as HTML at build time. The fastest possible way to serve a site.

### 3. State Management Complexity
*   **Atomic State (Zustand/Jotai)**: Scaling state by breaking it into tiny, independent "atoms" so that changing one value doesn't re-render the whole app.
*   **Normalized Cache**: Strategy used by React Query to "deduplicate" data. If two components need the same stock price, they share the same memory instead of fetching twice.

### 4. Micro-Frontends
For massive teams, you split the app into separate projects (e.g., "The Dashboard Team" and "The Market Team"). They deploy separately but look like one app to the user.
