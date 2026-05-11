## 2025-05-15 - [Onboarding Accessibility & Keyboard Flow]
**Learning:** In multi-step onboarding forms, implementing `returnKeyType` and `onSubmitEditing` significantly reduces friction for keyboard users. Additionally, providing localized `accessibilityLabel` for progress indicators and selectable cards ensures a smooth experience for screen reader users.
**Action:** Always link `TextInput` fields with `onSubmitEditing` to the primary action (like `handleNext`) and ensure all interactive selection elements have explicit `accessibilityRole` and `accessibilityState`.
