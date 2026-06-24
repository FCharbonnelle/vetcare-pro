## 2026-06-24 - Component extraction from render body
**Learning:** Defining components inside the render body of a functional component causes the component type to be recreated on every parent render. This forces React to unmount and remount the entire subtree, which is significantly more expensive than a re-render.
**Action:** Always extract sub-components to module scope and use `React.memo` for stable components that depend only on props.
