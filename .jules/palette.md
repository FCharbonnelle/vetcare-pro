## 2026-06-11 - Accessibility Labels for Interactive Elements
**Learning:** In React Native (Expo), `TouchableOpacity` elements often lack implicit roles and labels when they wrap icons or complex layouts. Screen readers may announce them as "unlabelled button" or just "button" without context.
**Action:** Always provide an `accessibilityLabel` that describes the action (e.g., "Notifications", "Détails de la courbe de poids") and set `accessibilityRole="button"` to ensure the element is correctly identified by assistive technologies.
