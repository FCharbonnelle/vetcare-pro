## 2026-07-05 - Optimize HistoryItem rendering in HistoryScreen
**Learning:** Defining component functions inside the render body of a parent functional component triggers a full unmount/remount cycle on every parent state update (e.g., typing in a text input). This is a significant performance bottleneck for lists.
**Action:** Always extract sub-components to the module scope and wrap them in `React.memo` to ensure they only re-render when their props actually change.
