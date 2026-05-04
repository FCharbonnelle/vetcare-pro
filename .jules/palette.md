## 2025-05-04 - Accessible Multi-step Onboarding
**Learning:** In multi-step forms where an input step is followed by a selection (non-input) step, setting `blurOnSubmit={false}` can cause the keyboard to obstruct selection cards, creating a poor UX.
**Action:** Only use `blurOnSubmit={false}` when advancing between consecutive `TextInput` fields. For transitions to non-input elements, allow the keyboard to dismiss naturally.
