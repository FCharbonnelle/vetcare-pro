## 2025-05-14 - Onboarding Flow UX & Accessibility

**Learning:** Onboarding inputs in Expo Web/React Native benefit significantly from `returnKeyType` and `onSubmitEditing` to provide a fluid, keyboard-driven progression. Additionally, explicit `accessibilityRole="button"` and `accessibilityState` on custom cards (like `TypeCard`) are essential for screen reader clarity in selection flows.

**Action:** Always implement keyboard-driven navigation (`returnKeyType`, `onSubmitEditing`) in multi-step forms and ensure interactive selection components have full semantic accessibility attributes.
