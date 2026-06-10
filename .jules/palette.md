## 2025-06-10 - Accessibility and Localization in AI Assist
**Learning:** Adding `accessibilityLiveRegion="polite"` to dynamic result containers ensures screen reader users are notified of asynchronous updates without immediate interruption. Consistent localization (French) across all UI elements, including upsell cards, improves professional feel.
**Action:** Always check for `accessibilityLiveRegion` on containers that show async results or status changes. Verify that all hardcoded strings match the project's primary language.
