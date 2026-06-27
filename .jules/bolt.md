## 2026-06-27 - Extracting components from render body
**Learning:** Defining component functions inside the render body of a parent functional component triggers a full unmount/remount cycle on every parent state update. This is a common performance bottleneck in React applications.
**Action:** Always extract sub-components to module scope and wrap them in `React.memo` to ensure stable references and prevent unnecessary remounts.

## 2026-06-27 - Stable references for Lucide icons
**Learning:** When passing Lucide icons as props to a memoized component, using the imported icon components directly provides stable references, which is critical for `React.memo` shallow comparisons to succeed.
**Action:** Import icons at the module level and pass them as props without intermediate wrappers or recreation in the render body.
