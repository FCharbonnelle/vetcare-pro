## 2026-05-08 - [Optimizing Re-renders in HistoryScreen]
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle of that component on every parent update, bypassing React's reconciliation.
**Action:** Always extract sub-components to module scope and wrap them in `React.memo` if they are part of a list or a screen with frequent state updates (like typing in a modal).
