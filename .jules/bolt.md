## 2026-05-15 - [Component Extraction for Performance]
**Learning:** Defining a component function inside the render body of a parent functional component causes a complete unmount/remount cycle of that child component on every parent update, as React sees it as a new component type.
**Action:** Always extract child components to module scope and use `React.memo` to prevent unnecessary re-renders when parent state changes.
