## 2025-05-15 - [Fluid Keyboard Navigation in Multi-Step Forms]
**Learning:** In React Native multi-step onboarding forms, coordinating `returnKeyType` and `onSubmitEditing` with conditional logic (e.g., `name && handleNext()`) creates a significantly more fluid "keyboard-first" experience that reduces friction for power users.
**Action:** Always implement keyboard-driven transitions in wizard-like interfaces by linking `TextInput` submission to the next step's trigger.
