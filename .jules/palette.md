## 2026-04-07 - Accessibility in Multi-step Onboarding
**Learning:** In multi-step React Native forms, accessibility should be dynamic. The `accessibilityValue` and `accessibilityLabel` of progress indicators must reflect the current step, and input navigation via `returnKeyType` significantly improves the flow for power users and those using assistive technologies.
**Action:** Always implement `onSubmitEditing` alongside `returnKeyType` and ensure `KeyboardAvoidingView` is used for mobile form screens to prevent layout issues.
