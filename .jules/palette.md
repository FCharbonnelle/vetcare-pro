## 2025-05-15 - Fluid Onboarding Keyboard Flow
**Learning:** In multi-step onboarding flows with text inputs, users expect a seamless keyboard-driven progression. Utilizing `returnKeyType` ("next" for intermediate steps, "done" for the final step) combined with `onSubmitEditing` to trigger the transition logic significantly reduces friction and cognitive load.
**Action:** Always implement `returnKeyType` and `onSubmitEditing` for sequential forms to enable one-handed, keyboard-only navigation.

## 2025-05-15 - Accessible Selection Cards
**Learning:** Custom selection components like `TypeCard` are often implemented as `TouchableOpacity` wrappers but lack semantic meaning for screen readers. Explicitly defining `accessibilityRole="button"`, `accessibilityLabel`, and `accessibilityState={{ selected: isSelected }}` is crucial for ensuring these interactive elements are navigable and understandable via assistive technology.
**Action:** Ensure all custom interactive cards have appropriate ARIA-equivalent attributes to communicate their role and state.
