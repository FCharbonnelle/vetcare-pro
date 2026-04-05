## 2025-05-15 - Redundant Label Handling for Screen Readers
**Learning:** In React Native, when a custom interactive component (like a card or navigation item) is given an `accessibilityLabel`, any internal `Text` elements will still be read by some screen readers, leading to confusing double-announcements.
**Action:** Use `aria-hidden={true}` (or `importantForAccessibility="no-hide-descendants"` for older versions) on internal text elements when the parent container already provides a descriptive `accessibilityLabel`.

## 2025-05-15 - Custom Selection Card Pattern
**Learning:** Selection cards that aren't standard checkboxes or radio buttons (like the `TypeCard` in onboarding) often lack semantic state for screen readers.
**Action:** Always include `accessibilityRole="button"`, a descriptive `accessibilityLabel`, and `accessibilityState={{ selected: isSelected }}` to ensure the user knows which item is selected and that they are interactable.
