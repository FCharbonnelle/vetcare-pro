## 2025-05-25 - Extracted and Memoized HistoryItem

**Learning:** Defining component functions inside the render body of a parent functional component (e.g., `HistoryItem` in `app/history.tsx`) causes a complete unmount/remount cycle on every parent update. This was especially visible when typing in a modal, where each keystroke triggered 4 unmounts/remounts of the existing history list items.

**Action:** Extracted `HistoryItem` to the module scope and wrapped it in `React.memo`. This stabilized the component identity and reduced the re-render count from 76 to 0 during a 16-character typing sequence.
