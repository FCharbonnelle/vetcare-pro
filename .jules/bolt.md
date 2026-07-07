## 2025-05-15 - Nested Component Performance Bottleneck
**Learning:** Defining component functions inside the render body of a parent functional component causes the sub-component to be re-created on every render. This triggers a full unmount and remount cycle for the sub-component and its entire subtree, which is significantly more expensive than a standard re-render.
**Action:** Extract nested components to the module scope and wrap them in `React.memo` to ensure they only re-render when their props change, and avoid unmount/remount cycles.
