## 2026-04-07 - Optimized Dashboard and History Rendering
**Learning:** Defining components inside the render function of another component (like 'HistoryItem' in 'app/history.tsx') is a significant performance anti-pattern that triggers full-screen re-renders on every parent state change.
**Action:** Extract nested components to the top level and wrap them in 'React.memo' with proper TypeScript interfaces to ensure stable references and prevent redundant re-renders.
