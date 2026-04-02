## 2025-04-02 - Onboarding Accessibility & Keyboard Flow
**Learning:** In React Native onboarding flows with multiple text inputs and selection cards, users benefit significantly from a cohesive keyboard-driven experience (onSubmitEditing) and clear accessibility roles (progressbar, button) to understand their progress and interact efficiently without manual tapping between fields.
**Action:** Always wrap multi-step forms in KeyboardAvoidingView and ensure progress indicators have appropriate accessibilityValue (min, max, now) to provide context to screen reader users.
