## 2025-06-18 - History Modal UX & Accessibility
**Learning:** Adding `accessibilityRole="button"` to `TouchableOpacity` components in Expo Web is essential for reliable UI testing and screen reader support, as it allows Playwright's `get_by_role("button")` to find elements that would otherwise only be accessible via text or test IDs. Additionally, `autoFocus={true}` on the primary modal input significantly reduces friction for frequent data entry tasks.
**Action:** Always include `accessibilityRole` on interactive wrappers and identify the "primary action" input in modals for `autoFocus`.
