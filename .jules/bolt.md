## 2025-05-15 - Inline Component Definition Anti-pattern
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update because the component type is recreated on every render.
**Action:** Always extract sub-components to the module scope and use `React.memo` to preserve state and reduce render overhead when the parent state changes.
