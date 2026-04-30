## 2025-05-15 - Onboarding Accessibility
**Learning:** Adding `accessibilityRole="progressbar"`, `accessibilityLabel`, and `accessibilityValue` to custom progress bar components in React Native ensures screen readers can communicate progress to users. In Expo Web, these are mapped to ARIA attributes, though verification via Playwright might sometimes show 'None' for value attributes despite being correctly implemented.
**Action:** Always include full accessibility suites for custom navigation or progress indicators to maintain inclusivity.
