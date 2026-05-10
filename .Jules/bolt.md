## 2025-05-14 - Extracting inline components for referential stability
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle of that component on every parent update, even if no props changed. This is because the component function itself is a new reference on every render.
**Action:** Always extract sub-components to the module scope and use `React.memo` for leaf components that render frequently or are part of large lists.
