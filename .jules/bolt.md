## 2025-05-14 - Memoization of calendar markers calculation
**Learning:** In the `AppointmentsScreen`, the `apptDays` calculation was performing an O(N) filtering and mapping operation on every render, including during text input in modals. This redundant work increases with the number of appointments.
**Action:** Use `useMemo` to cache the calculation results, ensuring it only re-runs when the underlying data (`appointments`) or the view context (`year`, `month`) changes.
