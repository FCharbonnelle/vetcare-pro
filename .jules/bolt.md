## 2026-06-03 - Component extraction and memoization in HistoryScreen
**Learning:** Defining component functions (like `HistoryItem`) inside the render body of a parent functional component causes a complete unmount/remount cycle on every parent update (e.g., typing in a form). This is significantly more expensive than a regular re-render.
**Action:** Always extract sub-components to module scope and wrap them with `React.memo` when they are part of a list or a screen with frequent state updates.
