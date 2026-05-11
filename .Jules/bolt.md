# Bolt Journal

## 2026-05-11 - [Extracting nested components prevents remounting]
**Learning:** Defining a component inside another functional component causes the inner component to be redefined on every render of the parent. This triggers a complete unmount and remount of all instances of the inner component, bypassing React reconciliation and .
**Action:** Always extract sub-components to the module scope and use `React.memo` for components that render in long lists or are children of components with frequent state updates (like modals with text inputs).

## 2025-05-15 - [Extracting nested components prevents remounting]
**Learning:** Defining a component inside another functional component causes the inner component to be redefined on every render of the parent. This triggers a complete unmount and remount of all instances of the inner component, bypassing React reconciliation and `React.memo`.
**Action:** Always extract sub-components to the module scope and use `React.memo` for components that render in long lists or are children of components with frequent state updates (like modals with text inputs).
