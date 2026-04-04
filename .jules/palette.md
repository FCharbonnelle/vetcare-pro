# Palette's Journal

## 2025-03-30 - Onboarding Accessibility and UX
**Learning:** In mobile onboarding flows, wrapping the content in `KeyboardAvoidingView` with platform-specific behaviors (`padding` for iOS, `height` for Android) is essential to keep action buttons visible. Additionally, using `accessibilityRole="progressbar"` with `accessibilityValue` on step indicators provides clear context to screen reader users about their progress.
**Action:** Always wrap multi-step forms in `KeyboardAvoidingView` and provide granular accessibility labels/states for custom selection cards and progress indicators.
