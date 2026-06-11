## 2026-06-11 - [Component Definition inside Render Body]
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle of that component and its entire subtree on every parent update, rather than a standard reconciliation.
**Action:** Always extract sub-components to module scope and wrap them with `React.memo` to preserve state and ensure efficient reconciliation.
