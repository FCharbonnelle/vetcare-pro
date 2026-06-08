## 2026-06-08 - Component Definition Anti-pattern
**Learning:** Defining a functional component inside the render body of a parent component causes the child to be redeclared on every parent render. This triggers a full unmount and remount cycle for the entire child tree, even if the props don't change, and defeats `React.memo`.
**Action:** Always extract child components to module scope and use `React.memo` for stable, efficient rendering.
