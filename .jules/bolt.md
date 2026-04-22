## 2025-05-15 - Optimize dashboard re-renders with memoization and useCallback

**Learning:** The Dashboard in this application acts as a central hub with multiple interactive elements (modals, navigation, quick actions). State changes like toggling the notification modal were triggering full re-renders of expensive components like the SVG `WeightLineChart` and various UI atoms (`StatPill`, `QuickAction`).

**Action:** Applied `React.memo` to `WeightLineChart`, `StatPill`, `QuickAction`, `VetCard`, and `NotifItem`. Stabilized all `onPress` handlers in the `Dashboard` using `React.useCallback`. This prevents approximately 10+ unnecessary component re-renders whenever the notification modal is toggled or other parent state changes occur.
