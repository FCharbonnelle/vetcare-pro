## 2025-05-15 - Onboarding Accessibility and Keyboard UX
**Learning:** React Native Web (Expo) often requires explicit `accessibilityRole` and `accessibilityLabel` props to render correctly as semantic HTML (e.g., `<button>` or `role="progressbar"`). Native keyboard UX is significantly improved by using `returnKeyType` and `onSubmitEditing` to create a fluid flow between onboarding steps.
**Action:** Always include accessibility props in interactive components and link `TextInput` actions to the screen's primary navigation logic.
