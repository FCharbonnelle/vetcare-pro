## 2025-05-22 - Onboarding Accessibility and Keyboard UX
**Learning:** In multi-step onboarding flows, users benefit significantly from being able to use the "Enter" key to progress. Standardizing accessibility roles (progressbar, button) and labels (explicit for inputs) ensures a smooth experience for screen reader users and power users alike.
**Action:** Always include `returnKeyType` and `onSubmitEditing` on onboarding text inputs, and ensure all custom interactive elements (like selection cards) have correct ARIA roles and states.
