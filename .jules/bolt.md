## 2025-05-14 - Component Extraction and Memoization in History Screen
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update, which is a significant performance bottleneck for lists. Extracting them to module scope and using `React.memo` is highly effective.
**Action:** Always check for child component definitions within the main render function and refactor them to module scope with `React.memo`.
