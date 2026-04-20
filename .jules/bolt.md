## 2025-05-15 - [PR Hygiene and Dependency Management]
**Learning:** Adding new dependencies (like Playwright for verification) or modifying `package.json` can lead to bloated PRs and violate persona boundaries if not explicitly requested. Auto-generated artifacts like `pnpm-lock.yaml` and logs must be cleared before submission.
**Action:** Use existing tools for verification and strictly avoid modifying core configuration files unless the optimization requires a new library. Always verify `git status` before requesting a review.
