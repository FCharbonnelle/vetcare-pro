## 2025-05-15 - [Initial Profiling]
**Learning:** Found that sub-components like `HistoryItem` in `app/history.tsx` and `TypeCard` in `app/onboarding.tsx` are defined inside the parent component's render body, causing them to be re-created on every parent render.
**Action:** Extract these sub-components to module scope and use `React.memo` to prevent unnecessary re-renders.
