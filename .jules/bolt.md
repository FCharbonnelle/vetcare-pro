## 2026-06-23 - Component definition inside render body
**Learning:** Defining a functional component inside another component's render body causes it to be re-created on every render, leading to a complete unmount and remount of that component and all its children. This destroys local state and causes significant performance degradation, especially in lists.
**Action:** Always define components at the module scope and use `React.memo` if they are part of a frequently re-rendering parent to ensure optimal performance.
