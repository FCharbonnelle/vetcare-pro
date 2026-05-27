
## 2026-05-27 - Component Extraction and Memoization
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update, which is significantly more expensive than a re-render.
**Action:** Extract these to module scope, use `React.memo`, and ensure all callback props are stabilized with `useCallback` in the parent to maintain the benefit of memoization.
