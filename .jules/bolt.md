## 2025-05-15 - HistoryItem Optimization
**Learning:** Defining component functions inside the render body of a parent functional component causes a complete unmount/remount cycle (or at least full re-execution if it's just a function call) on every parent update. In React Native, this is particularly expensive during text input if many items are rendered.
**Action:** Always extract child components to module scope and wrap them in React.memo if they only depend on simple props. Use stable prop types (like LucideIcon) instead of 'any' to ensure type safety.
