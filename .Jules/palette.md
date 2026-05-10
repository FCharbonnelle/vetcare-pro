# Palette Journal - Critical UX Learnings

## 2025-05-15 - Enhancing Onboarding Accessibility and Flow
**Learning:** In multi-step onboarding forms, providing immediate keyboard feedback (e.g., `returnKeyType="next"`) and explicit accessibility labels for progress indicators significantly improves the user experience for both power users and those using assistive technologies.
**Action:** Always ensure `TextInput` components in multi-step flows have appropriate `returnKeyType` and `onSubmitEditing` handlers, and that progress indicators are accessible.
