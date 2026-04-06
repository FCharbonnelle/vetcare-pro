## 2025-05-15 - Memoization of Dynamic Calendar Data

**Learning:** In screens like `AppointmentsScreen` that render complex calendar views, calculating auxiliary data (like `apptDays` Set) by filtering and mapping large arrays on every render is a significant bottleneck. This calculation is O(n) and runs unnecessarily during every state update (e.g., when opening a modal or typing in a field).

**Action:** Always memoize derived data structures (Sets, Maps, filtered arrays) used in the render path, especially when they depend on external state like a context or a large data list.
