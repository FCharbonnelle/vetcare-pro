## 2025-05-15 - [Accessible Forms & Keyboard Navigation]
**Learning:** In React Native Expo Web, `accessibilityRole="button"` is essential for Playwright to find elements via `get_by_role("button")`. Chaining inputs with `returnKeyType` and `onSubmitEditing` significantly reduces friction for keyboard users.
**Action:** Always provide `accessibilityRole` and localized `accessibilityLabel` for `TouchableOpacity` elements, and implement focus chaining in multi-input forms.
