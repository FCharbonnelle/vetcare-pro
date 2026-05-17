## 2025-05-15 - Inline Component Definition Bottleneck

**Learning:** Defining component functions inside the render body of a parent functional component causes the sub-component to be re-created on every parent render. This bypasses React's reconciliation and forces a complete unmount/remount cycle for that sub-component and its entire subtree, leading to severe performance degradation during frequent state updates (e.g., typing in a modal).

**Action:** Always extract sub-components (like list items or small UI blocks) to module scope. Use `React.memo` to ensure they only re-render when their props actually change.
