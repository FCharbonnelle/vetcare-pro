# Palette's Journal - VetCare Pro 🎨

## 2025-05-15 - Initializing UX & Accessibility focus
**Learning:** Accessibility in high-visual-polish apps (like those using glassmorphism and deep gradients) is often overlooked, particularly semantic roles for custom interactive cards and clear labeling for icon-only buttons.
**Action:** Always ensure that custom `TouchableOpacity` containers used as cards have `accessibilityRole="button"` and meaningful `accessibilityLabel`s that describe their content.
