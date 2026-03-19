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
