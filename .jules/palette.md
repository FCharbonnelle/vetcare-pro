## 2025-05-28 - [Accessibility Role Mapping]
**Learning:** Setting `accessibilityRole="button"` on React Native components effectively maps to `role="button"` in the web DOM (React Native Web), making them discoverable by screen readers and automation tools like Playwright using standard role locators.
**Action:** Always provide explicit `accessibilityRole` and `accessibilityLabel` to `TouchableOpacity` elements to ensure cross-platform accessibility and testability.
