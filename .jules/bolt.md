## 2026-06-28 - Component Redefinition Anti-pattern
**Learning:** This codebase frequently defines small UI components (like MenuItem, TypeCard, HistoryItem) inside the render body of parent functional components. This causes these sub-components to be completely unmounted and remounted on every parent state update, destroying their internal state and causing significant rendering overhead.
**Action:** Always extract sub-components to module scope and wrap them in React.memo with proper TypeScript interfaces to ensure stable component references and optimized re-renders.
