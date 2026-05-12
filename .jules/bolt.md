## 2025-05-20 - [Optimizing List Rendering in History Screen]
**Learning:** Defining a component inside another component's render function (even as a child function) causes it to be re-created on every render, leading to complete unmount/remount cycles. This prevents `React.memo` from working and degrades performance significantly as the list grows.
**Action:** Always extract child components to the module scope and wrap them in `React.memo` if they are pure. Ensure event handlers passed as props are stabilized using `useCallback` and functional state updates.
