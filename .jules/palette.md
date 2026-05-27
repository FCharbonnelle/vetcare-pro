## 2025-05-28 - Optimizing Onboarding Flow with Keyboard Navigation
**Learning:** In multi-step onboarding forms, users expect to advance using the keyboard's "Next" or "Go" button. Implementing 'returnKeyType' and 'onSubmitEditing' significantly reduces friction by keeping the user in the "flow" without requiring them to shift focus to a separate navigation button.
**Action:** Always map 'onSubmitEditing' to the primary progression handler and use appropriate 'returnKeyType' values ('next', 'done', 'search', etc.) for all text inputs in sequential flows.
