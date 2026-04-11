# Palette's Journal

## 2025-04-11 - Improving Onboarding Accessibility and Usability
**Learning:** In React Native onboarding flows, ensuring keyboard accessibility is crucial. Using `KeyboardAvoidingView` prevents the primary action button from being hidden by the keyboard, and adding `onSubmitEditing` to `TextInput` allows for a smoother, one-handed navigation experience.
**Action:** Always wrap multi-step forms in `KeyboardAvoidingView` and provide keyboard-based navigation triggers (`onSubmitEditing`, `returnKeyType`).
