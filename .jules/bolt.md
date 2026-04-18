## 2025-05-14 - [Anti-pattern: Components Defined in Render Bodies]
**Learning:** Defining functional components (like `NavItem` or `TypeCard`) within the render body of a parent component is a performance anti-pattern. React treats these as new component types on every render, triggering full subtree unmounting and remounting instead of reconciliation. This is particularly expensive during animations or in global layouts like `_layout.tsx`.

**Action:** Always extract sub-components to the module scope and use `React.memo` to stabilize them. Ensure props are explicitly typed to maintain codebase integrity.
