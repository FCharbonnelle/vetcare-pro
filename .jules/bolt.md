## 2026-06-21 - [Memoize calendar calculations in appointments]
**Learning:** The `app/appointments.tsx` component was recalculating calendar constants (year, month, daysInMonth, firstDay) and a Set of appointment days (`apptDays`) on every render. This occurred even for minor UI state changes like toggling the add-appointment modal.
**Action:** Use `useMemo` for any values derived from props or state that involve computations or array manipulations (filter/map) to ensure they only update when their specific dependencies change.
