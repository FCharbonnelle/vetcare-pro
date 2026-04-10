# Bolt Performance Journal

## 2025-05-15 - [Optimization: Reusable Component Memoization and Dashboard Prop Stability]
**Learning:** In React Native applications with complex dashboards and long lists, minor state changes in the parent (e.g., animation triggers, modal visibility toggles) cause widespread re-renders of child components. This is especially impactful for SVG-based charts and list items.
**Action:** Always memoize reusable UI components (cards, pills, list items) using `React.memo` and ensure prop stability in the parent using `useCallback` for function props and `useMemo` for complex objects.

## 2025-05-15 - [Codebase Pattern: Dashboard Re-renders]
**Learning:** The dashboard uses several `Animated.Value` instances and multiple state variables (`notifModalVisible`). Without memoization, every frame of the entry animation and every modal toggle causes the entire component tree, including the expensive `WeightLineChart`, to re-render.
**Action:** Isolate expensive components like charts and use `React.memo` to shield them from unrelated state changes. Ensure callbacks passed to memoized components are stable.
