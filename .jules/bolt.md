## 2025-05-14 - Component Definition Anti-pattern in History Screen

**Learning:** Defining child components (like `HistoryItem`) inside the render body of a parent functional component (`HistoryScreen`) causes them to be re-created on every parent render. This bypasses React's reconciliation and `React.memo` optimizations, leading to a complete unmount and remount of the entire child subtree on every state change (e.g., every keystroke in a modal).

**Action:** Always extract child components to the module scope and use `React.memo` for list items or components that depend on stable props, especially when the parent has frequent state updates.
