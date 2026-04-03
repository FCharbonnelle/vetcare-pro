## 2025-04-03 - Accessible selection cards pattern
**Learning:** Custom interactive elements like `TypeCard` in the onboarding flow require explicit accessibility roles and states (e.g., `accessibilityRole="button"`, `accessibilityState={{ selected: isSelected }}`) to be properly identified by screen readers, as they are often built using `TouchableOpacity` with custom internal styling.
**Action:** Always ensure that selection-based UI cards include `accessibilityRole="button"`, a descriptive `accessibilityLabel`, and an `accessibilityState` to reflect their selection status.
