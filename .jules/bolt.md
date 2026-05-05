## 2025-05-15 - Nested Component Remounting
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle of that component on every parent update, which is far more expensive than a simple re-render.
**Action:** Extract nested components to module scope and use `React.memo` to ensure referential stability and skip unnecessary reconciliation.
