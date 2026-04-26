## 2026-04-26 - Accessibility and Keyboard UX in Multi-step Onboarding
**Learning:** For selectable card components in onboarding flows, explicitly defining accessibilityRole="button" and accessibilityState={{ selected }} is crucial for screen reader users to understand interactive status. Additionally, binding onSubmitEditing to the next-step handler significantly improves the flow for keyboard users.
**Action:** Always apply semantic accessibility roles to custom interactive cards and ensure all form inputs support keyboard-driven progression using returnKeyType and onSubmitEditing.
