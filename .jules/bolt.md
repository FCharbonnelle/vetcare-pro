## 2026-06-16 - [Memoizing Calendar Derived State]
**Learning:** Recalculating calendar grid properties (days in month, first day) and filtering appointments for the current view on every render caused measurable overhead during simple state transitions like day selection.
**Action:** Group related calendar calculations into a single `useMemo` block and memoize filtered collections like `apptDays` to ensure they only update when the underlying data or the current month/year changes.
