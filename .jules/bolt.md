## 2026-04-17 - [Nested Component Definition Anti-pattern]
**Learning:** Defining functional components (like NavItem or TypeCard) within the render body of a parent component was found in `_layout.tsx` and `onboarding.tsx`. This causes React to re-create the component type on every render, leading to inefficient full subtree unmounting and remounting.
**Action:** Always extract child components to the top level of the file and use `React.memo` to ensure they only re-render when their props actually change.
