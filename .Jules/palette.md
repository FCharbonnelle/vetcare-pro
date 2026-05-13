
## 2026-05-13 - [Dashboard Accessibility]
**Learning:** Icon-only buttons and complex TouchableOpacity cards on the dashboard lack natural screen reader labels. Using accessibilityRole="button" combined with localized French accessibilityLabel significantly improves the UX for assistive technology users.
**Action:** Always audit dashboards for icon-only buttons and ensure interactive cards have descriptive labels that announce their purpose beyond just the text content.
