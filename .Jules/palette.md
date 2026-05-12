## 2025-05-15 - Improving Multi-step Form Experience

**Learning:** In multi-step onboarding forms, enabling keyboard-driven navigation (using `returnKeyType` and `onSubmitEditing`) significantly improves the flow for power users, but requires robust validation in the submission handler to prevent bypassing required fields. Accessibility labels for progress indicators should use the app's primary language to maintain consistency.

**Action:** Always link `TextInput` submission to the "Next" logic and ensure `accessibilityRole="progressbar"` is used for custom progress indicators with appropriate `accessibilityValue`.
