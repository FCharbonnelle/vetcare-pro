## 2025-06-13 - [Form Accessibility and Feedback]
**Learning:** In the current codebase, modal forms like 'Add Record' often lack immediate focus on the first field and allow submissions with empty required fields without visual feedback. Adding `autoFocus` and a visually faded disabled state (`opacity: 0.5`) significantly reduces friction and prevents invalid state.
**Action:** Always check for `autoFocus` on the primary input of new modals and ensure action buttons reflect the validity of the form state.
