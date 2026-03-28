# Bolt's Performance Journal ⚡

## 2025-05-15 - [Component Extraction & Memoization in Lists]
**Learning:** Defining sub-components (like `ApptCard`) inside the render body of a parent component is a major performance anti-pattern. It causes the sub-component to be recreated on every parent render, forcing the entire subtree to unmount and remount. This leads to 100% unnecessary re-renders of list items during unrelated state updates (e.g., typing in a modal).
**Action:** Always extract sub-components to the top level and wrap them in `React.memo`. Pair this with `useMemo` for any list filtering or data transformations to ensure stable props and optimal performance.

## 2025-05-15 - [Hoisting in TypeScript/React]
**Learning:** When extracting components to the top level, be careful with declaration order. Using a `const` in a type position (e.g., `typeof INITIAL_APPTS[0]`) before its declaration will cause issues.
**Action:** Ensure that constants used for types are declared before the components that consume them.
