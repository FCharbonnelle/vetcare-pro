## 2025-05-15 - Dashboard Re-render Optimization
**Learning:** In complex React Native screens like the VetCare Pro Dashboard, state changes (e.g., toggling a modal) trigger full re-renders of expensive child components like SVG charts and list items if not properly memoized. Passing inline functions as props further exacerbates this by breaking memoization.
**Action:** Always wrap leaf UI components in `React.memo` and use `useCallback` for all event handlers and `FlatList` `renderItem` functions to maintain stable references and ensure `React.memo` works effectively.
