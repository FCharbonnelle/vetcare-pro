## 2025-05-15 - Destructive Action Safeguards
**Learning:** Destructive actions like "Clear Data" should always have a confirmation dialog (e.g., using `Alert.alert`) to prevent accidental data loss, especially in high-stakes contexts like pet health management.
**Action:** Always implement a confirmation step for any action that results in irreversible data loss.

## 2025-05-15 - Enhanced Screen Reader Context
**Learning:** For interactive list items (like `MenuItem`), combining the title and subtitle into a single `accessibilityLabel` provides screen reader users with the full context of the action in one announcement.
**Action:** Ensure `accessibilityLabel` captures the full intent of an interactive element when it contains multiple pieces of information.
