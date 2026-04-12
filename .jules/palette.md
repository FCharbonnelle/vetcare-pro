## 2026-04-12 - Onboarding Flow Improvements
**Learning:** React Native's `KeyboardAvoidingView` is essential for multi-step onboarding forms on mobile to ensure primary action buttons remain reachable. Additionally, providing ARIA roles and labels to custom selection cards (like `TypeCard`) significantly improves screen reader navigation in Expo-based applications.
**Action:** Always wrap mobile forms in `KeyboardAvoidingView` and provide explicit accessibility states for custom interactive elements.
