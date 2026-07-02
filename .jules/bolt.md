## 2026-07-02 - Extracting and Memoizing Components to Module Scope
**Learning:** Defining small UI components inside the render body of a functional component (like `MenuItem` inside `SettingsScreen`) causes them to be recreated and re-mounted on every parent render, leading to performance degradation and state loss in some cases.
**Action:** Always extract sub-components to the module scope and wrap them in `React.memo` to ensure stable references and avoid unnecessary re-renders.
