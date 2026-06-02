## 2026-06-02 - Disabled Button UX and Accessibility
**Learning:** For interactive elements like submit buttons, a functional `disabled` state must be paired with a visual cue (like reduced opacity) and an `accessibilityRole` to ensure both sighted and screen reader users understand the button's status.
**Action:** Always apply `opacity: 0.5` (or similar) when `disabled={true}` and ensure `accessibilityRole="button"` is present.
