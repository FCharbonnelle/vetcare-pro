## 2025-03-03 - Enhancing Core Component Accessibility
**Learning:** Core interactive elements (buttons, progress bars) and status indicators in the initial scaffold lacked standard ARIA-equivalent attributes (accessibilityLabel, accessibilityRole, accessibilityValue), which are essential for screen reader users in React Native/Expo applications.
**Action:** Always include accessibility attributes for icon-only buttons and ensure that complex status components (like StatPill) are marked as single accessible units with combined labels.
