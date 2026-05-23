## 2025-05-15 - Accessibility Enhancements for Interactive Components

**Learning:** Interactive elements in React Native (like `TouchableOpacity`) often lack semantic roles and descriptive labels by default, making them inaccessible to screen readers. Specifically, the 'glassmorphism' design style can sometimes lead to buttons that are visually distinct but semantically 'invisible' to assistive tech if they are just icon-based.

**Action:** Always include `accessibilityRole="button"` and a localized `accessibilityLabel` for all `TouchableOpacity` elements. For multi-step processes, use `accessibilityRole="progressbar"` and `accessibilityValue` to provide context on progress.
