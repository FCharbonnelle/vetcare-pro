## 2025-05-19 - Form State Isolation & Component Memoization
**Learning:** In React Native screens displaying lists alongside modal text inputs (e.g., appointments.tsx), keystrokes trigger full-screen re-renders. Moving form state into a separate component (e.g., AddApptModal.tsx) localizes updates, significantly improving interaction performance.
**Action:** Always isolate high-frequency state updates (like text inputs) into separate components and use `React.memo` for reusable list items and UI atoms to maintain a smooth 60fps experience.
