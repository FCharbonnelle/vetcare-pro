## 2025-05-15 - HistoryItem Extraction and Memoization
**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update, even if the item props are the same. This can be verified by monitoring console lifecycle logs (MOUNT/UNMOUNT) during state-heavy interactions like opening modals.
**Action:** Extract nested component definitions to module scope and use `React.memo` to preserve state and reduce render overhead in list-heavy screens.
