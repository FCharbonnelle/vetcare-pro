## 2025-05-14 - [Dashboard Accessibility]
**Learning:** Reusable components like `QuickAction` and icon-only buttons (notifications, profile) often lack explicit accessibility roles and labels in the initial implementation, making them invisible to screen readers.
**Action:** Always include `accessibilityRole="button"` and localized `accessibilityLabel` for all interactive elements, especially those without text labels or those using generic text like "Détails".
