## 2025-05-15 - [Referential Stability for Memoization]
**Learning:** When wrapping components in `React.memo`, if those components receive function props (e.g., `onPress`), they will still re-render unless the parent stabilizes those functions with `useCallback`. Similarly, `renderItem` in `FlatList` should be stable to avoid item re-renders.
**Action:** Always pair `React.memo` with `useCallback` for function props in the parent component.

## 2025-05-15 - [PR Hygiene and Artifacts]
**Learning:** Running `pnpm install` generates a large `pnpm-lock.yaml` which can pollute PRs and violate line count limits if accidentally included.
**Action:** Explicitly remove or unstage `pnpm-lock.yaml` before submitting changes unless explicitly asked to update dependencies.
