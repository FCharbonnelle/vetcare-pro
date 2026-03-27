## 2025-05-22 - [Memoization in Lists with Local State Modals]
**Learning:** In screens where a list is displayed alongside a modal for adding items (like `appointments.tsx`), every keystroke in the modal's text input triggers a re-render of the entire screen, including the list.
**Action:** Extract list items to top-level `React.memo` components and use `useMemo` for any filtering/sorting of the list data to keep the UI responsive during input.
