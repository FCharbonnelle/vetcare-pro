## 2025-05-15 - Onboarding Flow Keyboard Management

**Learning:** In multi-step onboarding forms, only use `blurOnSubmit={false}` when advancing between consecutive `TextInput` fields. Avoiding it when the next step contains selection cards or non-input elements (like Step 2 in this app) prevents the keyboard from obstructing the UI and forcing manual dismissal.

**Action:** Always check the component type of the subsequent step before setting `blurOnSubmit`. Only keep the keyboard open if the next step is another text input.
