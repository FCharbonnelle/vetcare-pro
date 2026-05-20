## 2025-05-15 - [Enhanced Onboarding Keyboard Flow]
**Learning:** In multi-step React Native forms, adding `returnKeyType` and `onSubmitEditing` to `TextInput` significantly improves the UX by allowing users to navigate without manually dismissing the keyboard.
**Action:** Always implement keyboard-driven transitions for sequential input fields to reduce friction.

## 2025-05-15 - [Screen Reader Support for Progress Indicators]
**Learning:** Progress bars in multi-step flows are often invisible to screen readers unless explicitly marked with `accessibilityRole="progressbar"` and `accessibilityValue`.
**Action:** Use localized `accessibilityLabel` (e.g., "Étape X sur Y") to provide clear situational context for blind users.
