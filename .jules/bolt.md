## 2025-05-15 - Dashboard Re-render Optimization
**Learning:** In complex hub screens like the Dashboard, state updates for simple UI elements (like modals) trigger expensive re-renders of the entire subtree, including heavy SVG charts and lists. Memoizing child components is only effective if the functions passed to them are also stabilized.
**Action:** Always wrap navigation and state-toggle callbacks in `useCallback` when passing them to components memoized with `React.memo` to maintain prop stability and prevent unnecessary re-renders.
