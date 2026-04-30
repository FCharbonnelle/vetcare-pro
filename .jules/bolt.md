## 2025-05-15 - Dashboard Memoization
**Learning:** In a dashboard with complex SVG charts (like `WeightLineChart`) and many small UI components (like `StatPill` or `VetCard`), state changes (e.g., toggling a modal) can trigger expensive full-subtree re-renders if those components aren't memoized. Referentially unstable callbacks passed to children can also invalidate `React.memo` benefits.
**Action:** Always wrap leaf UI components in `React.memo` and ensure all callbacks passed to them are stabilized with `useCallback` when optimizing performance hotspots.
