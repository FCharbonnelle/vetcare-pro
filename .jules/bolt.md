## 2025-05-15 - Nested Component Re-renders
**Learning:** Defining components within the render body of a parent component (e.g., HistoryItem inside HistoryScreen) causes the child to be recreated on every parent render. This leads to a full unmount and remount cycle, which is significantly more expensive than a standard update and resets child state.
**Action:** Always extract sub-components to the module scope and use React.memo() for list items or complex children to ensure they only re-render when their specific props change.
