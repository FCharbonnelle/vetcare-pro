## 2026-04-16 - Memoization of Dashboard Components
**Learning:** The Dashboard component was re-rendering expensive SVG charts and list items on every state change (e.g., opening a notification modal). Memoizing core UI components and using `useCallback` for event handlers significantly reduces the re-render surface.
**Action:** Always wrap reusable UI components in `React.memo` and stabilize callbacks passed to them to ensure memoization is effective.

## 2026-04-16 - PR Hygiene
**Learning:** Running `pnpm install` or background servers can generate large lockfiles or logs that shouldn't be committed.
**Action:** Always check `git status` before submitting and ensure only intended source changes are staged.
