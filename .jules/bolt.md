## 2025-05-22 - HistoryItem rendering optimization
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update, making memoization impossible and hurting performance during interactions like typing in a modal.
**Action:** Extract nested components to module scope and wrap them with `React.memo` to allow proper reconciliation and prop-based optimization.
