## 2026-05-24 - [Keyboard Navigation in Multi-step Onboarding]
**Learning:** Adding `onSubmitEditing` and `returnKeyType` to `TextInput` in a multi-step form significantly improves the perceived speed of the onboarding flow by allowing users to use the keyboard's "Next" button instead of hunting for the UI button.
**Action:** Always pair `TextInput` with proper `returnKeyType` and `onSubmitEditing` handlers in sequential forms.
