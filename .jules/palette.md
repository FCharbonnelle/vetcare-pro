## 2025-07-02 - [Accessibility Label Translation in Expo Web]
**Learning:** In the Expo Web (react-native-web) environment, `accessibilityLabel` and `accessibilityRole` props on `TouchableOpacity` may not consistently translate to `aria-label` or `role` in the DOM as expected by automated testing tools like Playwright.
**Action:** Always perform code-level verification (e.g., using `grep` or `cat`) in addition to DOM-based assertions when verifying accessibility attributes in this environment.
