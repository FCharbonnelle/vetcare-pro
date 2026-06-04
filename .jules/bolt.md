## 2026-06-04 - Component identity and unmount cycles
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle on every parent update, as the component's identity is recreated.
**Action:** Extract nested components to module scope and wrap with `React.memo` for optimal performance.
