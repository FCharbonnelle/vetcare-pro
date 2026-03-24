# 🎨 Palette's Journal - VetCare Pro

## 2026-03-24 - [Onboarding Accessibility & Keyboard Handling]
**Learning:** Onboarding flows in mobile apps often forget to handle keyboard overlays, which can block the primary action button on smaller screens. Additionally, without proper ARIA labels and roles, screen reader users might find it difficult to navigate through custom card-based selection components.
**Action:** Always wrap interactive forms in `KeyboardAvoidingView` and ensure custom selection components have `accessibilityRole="button"` and clear `accessibilityLabel` attributes.
