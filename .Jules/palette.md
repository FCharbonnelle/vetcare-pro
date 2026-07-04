## 2025-05-14 - Settings Screen Safety & Accessibility

**Learning:** Destructive actions like data reset and session termination (logout) lack safety nets by default in this app, which can lead to accidental data loss or frustration. Implementing localized confirmation dialogs using `Alert.alert` provides a critical friction point that protects the user's intent. Additionally, standard `TouchableOpacity` components require explicit `accessibilityRole="button"` and descriptive `accessibilityLabel` to be correctly interpreted by screen readers.

**Action:** Always wrap destructive or session-ending actions in confirmation dialogs and ensure all interactive `TouchableOpacity` wrappers have semantic accessibility roles and labels.
