
## 2026-06-30 - Component Extraction and Memoization in HistoryScreen
**Learning:** Defining components inside the render body of another component causes them to be recreated on every render, leading to expensive unmount/remount cycles. Extracting them to module scope ensures a stable component reference.
**Action:** Always scan for inline component definitions in high-traffic or state-heavy screens (like forms and lists) and extract them to module scope, wrapping them in `React.memo` when they receive stable props.
