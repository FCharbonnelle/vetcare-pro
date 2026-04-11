## 2025-05-15 - Dashboard Re-render Bottleneck
**Learning:** The `Dashboard` component in this architecture acts as a primary state container. Frequent state updates (e.g., toggling modals) trigger full-tree re-renders of expensive child components like `WeightLineChart` and various card lists, impacting UI responsiveness.
**Action:** Always wrap reusable UI components (Cards, Pills, Actions) in `React.memo` and use `useCallback` for their event handlers to ensure prop stability and skip unnecessary re-renders in heavy parent screens.
