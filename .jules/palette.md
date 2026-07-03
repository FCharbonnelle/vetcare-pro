## 2026-07-03 - Accessible Touchable Wrappers
**Learning:** In Expo Web/React Native Web, `TouchableOpacity` elements wrapping icons or multiple text nodes often fail to provide descriptive context to screen readers unless explicitly given an `accessibilityRole="button"` and a concise `accessibilityLabel`.
**Action:** Always audit `TouchableOpacity` components for icon-only or multi-node content and add semantic ARIA-equivalent props to ensure screen reader visibility.

## 2026-07-03 - Defensive UX for Destructive Actions
**Learning:** Users in pet health apps may perform high-stakes actions (like clearing records) while under stress. Implementing mandatory `Alert.alert` confirmation for all destructive triggers is a critical safety net.
**Action:** Wrap any state-resetting or deletion logic in a confirmation dialog with clear "Cancel" and "Destructive" options.
