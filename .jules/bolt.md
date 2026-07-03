## 2026-07-03 - Prevent Unnecessary Unmounts by Extracting Components
**Learning:** Defining a component inside the render body of another component causes the inner component to be re-created on every render of the parent. This triggers a full unmount and mount cycle for all instances of the inner component, which is expensive and resets internal state (like animations or focus).
**Action:** Always define sub-components at the module level (outside the parent component) and use `React.memo` to prevent unnecessary re-renders. Pass necessary data and callbacks via props.
