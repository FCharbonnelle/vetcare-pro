## 2026-06-29 - Nested Component Anti-pattern
**Learning:** Defining sub-components inside the render body of a parent functional component causes them to be recreated on every parent render, leading to expensive unmount/remount cycles.
**Action:** Always extract sub-components to the module scope and wrap them in `React.memo` when they receive stable props or are part of a large list.
