## 2025-05-15 - Keyboard Navigation and Accessibility in Forms
**Learning:** Chaining `TextInput` focus using `useRef` and `onSubmitEditing` significantly improves the UX of mobile forms by allowing users to complete inputs without dismissing the keyboard. Coupled with `accessibilityLabel` and `accessibilityRole`, it ensures the form is both efficient for power users and accessible for those using assistive technologies.
**Action:** Always use `returnKeyType="next"` and `useRef` to chain inputs in multi-field forms, and ensure all interactive elements have appropriate ARIA roles and labels.
