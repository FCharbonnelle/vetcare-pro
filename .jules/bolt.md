## 2025-05-15 - Extraction of Nested Components in Layout
**Learning:** Defining a component (like `NavItem`) inside the render function of another component (`UnifiedNav`) causes it to be re-created on every render, triggering a full unmount and remount of that subtree. This is particularly expensive in layouts that wrap many screens.
**Action:** Always extract reusable sub-components to the top level of the file and use `React.memo` along with `useCallback` for any function props to ensure stable references and prevent redundant re-renders.
