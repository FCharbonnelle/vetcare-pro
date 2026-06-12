## 2025-05-14 - Component Definition in Render Body
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle on every parent update, which is significantly more expensive than a simple re-render.
**Action:** Always extract sub-components to module scope and use `React.memo` to preserve their state and identity across parent renders.
