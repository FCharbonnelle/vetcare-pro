## 2026-06-05 - Improving Form Accessibility and Flow
**Learning:** Setting `accessibilityRole="button"` on React Native components translates to `role="button"` in the web DOM, enabling verification in Playwright using `page.get_by_role("button", name="...")`. Chaining `TextInput` fields using `useRef` and `onSubmitEditing` significantly improves keyboard-only navigation.
**Action:** Always include `accessibilityRole` for interactive components and use `ref` to manage focus flow in multi-field forms.
