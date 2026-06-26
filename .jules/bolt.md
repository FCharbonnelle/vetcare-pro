## 2026-06-26 - Component extraction and memoization
**Learning:** Defining helper components like 'HistoryItem' inside a parent component's render body causes them to be re-created on every render, triggering full unmount/remount cycles. Extraction to module scope coupled with 'React.memo' ensures stable component references and efficient reconciliation.
**Action:** Always define reusable UI components outside of parent render functions and use 'React.memo' for list items or expensive sub-components to prevent unnecessary re-renders.
