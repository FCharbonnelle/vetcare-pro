## 2025-05-14 - Optimized component re-renders with React.memo and extraction

**Learning:** Defining components inside other components' render functions is a significant performance anti-pattern as it causes full unmounts/remounts on every parent render. Reusable UI components used in lists (Dashboard, History) benefit from React.memo when their parent state changes frequently (e.g., during text input or modal toggles).

**Action:** Always extract components to the top level. Wrap pure UI components in React.memo when they are used in lists or alongside frequently changing state.
