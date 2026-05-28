## 2025-05-28 - Component Extraction and Memoization in History Screen
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle on every parent update. This is particularly expensive when the parent state changes frequently, such as on every keystroke in a modal.
**Action:** Always extract child components to module scope and wrap them with `React.memo` if they only depend on stable props or if their parent re-renders frequently.
