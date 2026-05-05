## 2025-03-05 - [Onboarding Accessibility & Fluidity]
**Learning:** In multi-step onboarding flows with non-input steps (like category selection), combining standard ARIA roles with keyboard-aware `TextInput` configurations (`returnKeyType="next"`) creates a significantly more fluid experience for both screen reader and power users.
**Action:** Always link `onSubmitEditing` to the next step handler in onboarding forms to allow keyboard-driven progression.
