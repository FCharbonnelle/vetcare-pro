## 2025-05-22 - Confirmation Dialogs for Destructive Actions
**Learning:** Destructive actions like "Clear Cache" or "Logout" were previously executed immediately upon click. In a high-stakes health app where data persistence is critical (pet medical records), accidental data loss can significantly degrade trust.
**Action:** Always wrap destructive or session-ending actions in a confirmation `Alert.alert` to provide a safety net for users.

## 2025-05-22 - Semantic Accessibility for Touchables
**Learning:** The application uses many `TouchableOpacity` wrappers for complex UI cards (VetCard, QuickAction). Without explicit `accessibilityRole="button"` and `accessibilityLabel`, these elements are often perceived as non-interactive or confusing by screen readers, especially when they contain multiple text nodes or icons.
**Action:** Consistently apply `accessibilityRole="button"` and meaningful, localized `accessibilityLabel` attributes to all interactive `TouchableOpacity` components to ensure a semantic and navigable experience for assistive technology users.
