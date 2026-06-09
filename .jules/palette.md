## 2025-05-15 - [Dashboard Accessibility Gap]
**Learning:** Multiple interactive components in the repository (e.g., `QuickAction`, `VetCard`, and header buttons in `app/dashboard.tsx`) currently lack `accessibilityRole="button"` and `accessibilityLabel` attributes, which is a recurring accessibility issue pattern.
**Action:** Proactively audit `TouchableOpacity` and `Pressable` wrappers across all screens to ensure semantic roles and localized labels are present for screen readers.
