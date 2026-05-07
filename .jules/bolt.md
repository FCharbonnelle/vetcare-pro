## 2026-05-07 - [Component definition inside render function]
**Learning:** Defining a functional component inside the body of another functional component causes the inner component to be re-created on every render of the parent. This results in a complete unmount and remount cycle for the inner component, losing its internal state and causing significant performance degradation, especially in lists.
**Action:** Always extract sub-components to the module scope and use `React.memo` to ensure they only re-render when their props actually change.
