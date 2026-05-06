## 2026-05-06 - [Extract and memoize HistoryItem]
**Learning:** Defining a component inside another component's render body causes it to be re-created on every parent render, leading to unnecessary unmount/remount cycles and performance degradation, especially when the parent has frequent state updates (e.g., controlled inputs in a modal).
**Action:** Always extract sub-components to module scope and wrap them in `React.memo` if they are functionally stable and should only re-render when their props change.
