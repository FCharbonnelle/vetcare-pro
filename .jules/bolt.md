## 2025-05-15 - [Anti-pattern: Inline Component Definitions]
**Learning:** Defining a component function inside the render body of another functional component (e.g., `HistoryItem` inside `HistoryScreen`) causes the child component to be completely unmounted and remounted on every parent render. This is because the component reference changes every time, preventing React from performing efficient reconciliation.
**Action:** Always extract sub-components to the module scope and use `React.memo` for list items or frequently re-rendered components to preserve state and reduce render overhead.
