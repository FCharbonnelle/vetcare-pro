## 2025-05-15 - Rendering Optimizations for High-Cost Components

**Learning:** Declaring components inside another component's render function (e.g., `const Nested = (...) => ...` within `Parent`) is a performance anti-pattern. It causes the nested component to be re-created on every render, leading to full unmount and remount cycles of the entire sub-tree, which is significantly more expensive than a simple re-render. Additionally, reusable UI elements like stat pills and action buttons frequently subject to parent re-renders benefit from `React.memo` to skip redundant reconciliation when props haven't changed.

**Action:** Always extract nested components to the top level. Wrap them in `React.memo` along with other high-frequency reusable UI components (e.g., `StatPill`, `QuickAction`) to ensure stable component identities and minimize rendering overhead.
