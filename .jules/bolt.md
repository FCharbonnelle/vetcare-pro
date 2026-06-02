# Bolt's Performance Journal

## 2026-06-02 - Component Extraction for Reconciliation Efficiency
**Learning:** Defining a component function inside the render body of another functional component is a major performance anti-pattern in React. It causes the inner component to be re-created on every render, leading to a different reference and forcing React to unmount and remount the entire subtree instead of just patching it.
**Action:** Always extract child components to module scope and use `React.memo` if they depend on stable props, especially when the parent component has frequent state updates (like text input in modals).
