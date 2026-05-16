## 2025-05-14 - Keyboard UX in Multi-step Forms
**Learning:** In multi-step onboarding forms, only use `blurOnSubmit={false}` when advancing between consecutive `TextInput` fields; avoid it when the next step contains selection cards or non-input elements to prevent the keyboard from obstructing the UI.
**Action:** Always check the component type of the subsequent step before implementing persistent keyboard focus.
