## 2026-06-05 - Memoization in AppointmentsScreen
**Learning:** Defining form state (like `newTitle`) at the top level of screens containing modals causes full-screen re-renders on every keystroke, which makes expensive calculations like calendar grid generation and list rendering problematic.
**Action:** Always memoize derived state (like calendar days) and complex child components (like list items) using `useMemo` and `React.memo` to maintain input responsiveness in forms.
