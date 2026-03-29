# Palette's Journal - VetCare Pro

## 2026-03-29 - [Accessibility in Onboarding and Appointments]
**Learning:** React Native components like `TouchableOpacity` used as buttons or selection cards often miss `accessibilityRole` and `accessibilityState`, making them invisible or confusing to screen readers. In a French-localized app, these labels must also be in French.
**Action:** Always add `accessibilityRole="button"`, `accessibilityLabel`, and `accessibilityState` to custom interactive elements. For progress indicators, use `accessibilityRole="progressbar"`.
