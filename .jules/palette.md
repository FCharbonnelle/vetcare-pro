## 2026-05-25 - Form Accessibility and Keyboard Navigation in History
**Learning:** Form inputs in the "Nouvel Historique" modal lacked keyboard navigation flow and clear accessibility labels, and the save button didn't provide immediate feedback for invalid states (empty title). Chaining `TextInput` fields with `useRef` and `onSubmitEditing` significantly improves the mobile user experience by reducing manual taps.
**Action:** Always implement `useRef` chaining for multi-input forms and provide visual/ARIA feedback for disabled button states to guide users toward valid submissions.
