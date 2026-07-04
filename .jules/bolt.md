# Bolt Performance Journal

## 2025-05-14 - Initial Performance Audit
**Learning:** Found several components defined inside render functions (TypeCard in onboarding.tsx, InputField in user-profile.tsx). This causes full unmount/remount on every parent state change, which is especially problematic for components with animations or inputs.
**Action:** Extract these components to module scope and wrap with React.memo to ensure stable component references and prevent unnecessary re-renders.
