## 2026-05-14 - [Memoize HistoryItem to prevent unnecessary re-renders]
**Learning:** Defining a component function inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle of that component on every parent update, which is a major performance bottleneck.
**Action:** Always extract child components to module scope and wrap them in `React.memo` to ensure referential stability and skip unnecessary re-renders when props remain unchanged.
