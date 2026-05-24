## 2025-05-24 - Component extraction and memoization
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle on every parent update, which is a significant performance bottleneck in lists or forms.
**Action:** Always extract child components to module scope and wrap them in React.memo if they only depend on simple props. Ensure the default React import is present when using React.memo.
