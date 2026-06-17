## 2025-05-15 - Extracting Components to Module Scope
**Learning:** Defining a component function inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update. React sees a new function reference as a new component type, forcing a full reconciliation.
**Action:** Always extract sub-components to the module scope and use `React.memo` to preserve state and avoid expensive mount/unmount operations during parent state updates.
