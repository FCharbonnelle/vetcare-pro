## 2025-05-15 - Enhancing Asynchronous Feedback for Screen Readers
**Learning:** Asynchronous state changes (like AI analysis results) require `accessibilityLiveRegion="polite"` on the container to ensure screen reader users are notified of dynamic updates without interrupting their current focus.
**Action:** Always check for dynamic UI updates (loading states, results) and apply `accessibilityLiveRegion` to the relevant parent containers.
