## 2025-05-14 - Mobile Onboarding Accessibility & UX
**Learning:** In multi-step onboarding flows, combining `KeyboardAvoidingView` with semantic accessibility roles (e.g., `progressbar`, `button`) and keyboard navigation props (`onSubmitEditing`, `returnKeyType`) significantly reduces friction for mobile and assistive technology users.
**Action:** Always wrap mobile forms in `KeyboardAvoidingView` and ensure all interactive elements and progress indicators have appropriate ARIA-equivalent roles and labels.
