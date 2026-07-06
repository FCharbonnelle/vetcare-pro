## 2025-05-15 - Onboarding render optimization
**Learning:** Defining component functions inside the render body of a parent functional component causes them to be recreated on every parent update, triggering a full unmount and remount cycle for those sub-components.
**Action:** Extract nested sub-components to the module scope and wrap them in `React.memo`. Use `useCallback` for any event handlers passed as props to these components to ensure stable references.
