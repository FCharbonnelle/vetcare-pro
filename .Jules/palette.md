## 2025-03-22 - [Accessibility & Feedback in Pet Profile]
**Learning:** Icon-only buttons in the main navigation and profile editing screens lacked descriptive accessibility labels, making them inaccessible to screen readers. Additionally, asynchronous save actions without visual feedback lead to a poor user experience and potential duplicate submissions.
**Action:** Always provide `accessibilityLabel` and `accessibilityRole` for icon-only buttons. Implement a `loading` state (e.g., `isSaving`) with an `ActivityIndicator` for any asynchronous operations that modify state.
