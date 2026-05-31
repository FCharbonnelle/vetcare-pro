## 2025-05-22 - Component Extraction and Memoization
**Learning:** Defining a component inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes it to be unmounted and remounted on every parent update, leading to significant performance degradation.
**Action:** Always extract child components to module scope and wrap them with `React.memo` to prevent redundant re-renders and unmounts.
