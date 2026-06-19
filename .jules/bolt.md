## 2025-06-19 - Component Definition Inside Render Cycle
**Learning:** Defining component functions inside the body of a parent functional component (e.g., `HistoryItem` inside `HistoryScreen`) is a significant performance bottleneck. It causes the inner component to be re-created on every render, triggering a complete unmount and remount of its entire subtree rather than a simple reconciliation.
**Action:** Always extract sub-components to the module scope and wrap them in `React.memo` if they depend on stable props to prevent redundant re-renders and preserve component state/lifecycle.
