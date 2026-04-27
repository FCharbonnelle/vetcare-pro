## 2025-04-27 - PR Hygiene and Artifacts
**Learning:** Running `pnpm install` in an environment without a lockfile generates a `pnpm-lock.yaml` which can be massive (8000+ lines). Including this in a PR violates scope and size constraints, and can be seen as a major procedural error.
**Action:** Always delete or unstage `pnpm-lock.yaml` before submitting if it wasn't explicitly requested or part of the task.

## 2025-04-27 - Memoization Documentation
**Learning:** Performance-focused agents like Bolt are expected to not only implement optimizations but also document the "Why" and "Expected Impact" in code comments.
**Action:** Always add descriptive comments to `React.memo`, `useMemo`, or `useCallback` implementations explaining the specific bottleneck being addressed.
