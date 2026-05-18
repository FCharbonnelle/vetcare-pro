## 2025-05-14 - Extracting inline components to module scope for memoization

**Learning:** Defining components inside a parent functional component's body (e.g., `const HistoryItem = (...) => ...` inside `HistoryScreen`) causes the child component to be re-created on every parent render. This bypasses `React.memo` and leads to complete unmount/remount cycles of the child sub-tree, which is extremely expensive for list items.

**Action:** Always extract child components to module scope (outside the parent component) and wrap them in `React.memo` if they don't need to close over parent state variables. If they do need parent state, pass it via props or context instead.
