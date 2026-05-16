## 2025-05-16 - [Component Extraction for Memoization]
**Learning:** Defining component functions inside the render body of a parent functional component causes them to be recreated on every render. This leads to a complete unmount and remount of all instances, bypassing `React.memo` benefits and potentially causing animation flickers or focus loss.
**Action:** Always extract sub-components to the module scope and use `React.memo` for list items or components that rely on stable props.
