## 2025-05-07 - Accessibility in Onboarding
**Learning:** In a multi-step onboarding flow, providing context to screen reader users about their current progress (e.g., "Step X of Y") is crucial for a smooth UX. Additionally, interactive cards used for selection must be explicitly marked with roles and states to be meaningful to assistive technologies.
**Action:** Always include a descriptive `accessibilityLabel` on progress indicators and use `accessibilityRole="button"` with `accessibilityState` for custom selection components.
