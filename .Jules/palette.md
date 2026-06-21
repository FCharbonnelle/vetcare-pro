## 2025-05-15 - Improving destructive actions safety
**Learning:** React Native Web's default `Alert.alert` is a no-op, meaning confirmation dialogs using it won't show on web unless polyfilled. However, it remains the standard way to handle confirmations for native mobile targets in Expo projects.
**Action:** Always implement accessibility labels and roles for interactive elements to ensure a baseline of usability, and consider the platform limitations of `Alert` when verifying on web.
