## 2025-05-14 - Component Extraction Performance
**Learning:** Defining component functions inside the render body of a parent functional component causes them to be recreated on every render. This forces a complete unmount/remount cycle of the child component even if its props haven't changed, as React sees it as a new component type.
**Action:** Extract child components (like `HistoryItem` or `TypeCard`) to the module scope and wrap them in `React.memo()`. If the component receives callbacks, ensure those are wrapped in `useCallback()` to maintain referential stability.
