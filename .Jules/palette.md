## 2026-06-16 - AI Assist Accessibility and Localization
**Learning:** Asynchronous state changes (like AI result delivery) require `accessibilityLiveRegion="polite"` to ensure screen reader users are notified of dynamic updates without interrupting their current focus. Additionally, keeping UI language consistent across all sections, including upsell cards, is critical for a polished UX in multi-language apps.
**Action:** Always wrap dynamic result containers with `accessibilityLiveRegion` and audit all decorative/upsell text for localization consistency during UX passes.
