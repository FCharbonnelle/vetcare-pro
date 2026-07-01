# Bolt Journal

## 2026-07-01 - Stabilizing the Component Tree in History Screen
**Learning:** Defining a component (like `HistoryItem`) inside the render body of a parent functional component causes the sub-component to be unmounted and remounted on every parent state update because the component reference is recreated. In `app/history.tsx`, this caused the entire list of activities to flicker and lose state whenever the addition modal was toggled.
**Action:** Always extract sub-components to the module scope and wrap them in `React.memo` to ensure stable references and avoid unnecessary unmount/remount cycles.
