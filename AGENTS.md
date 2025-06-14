# RITUAL Project Agent Guidelines

This repository follows **AGENTS.json** as the canonical specification for the RITUAL backend. Key points:

- Treat `AGENTS.json` as read-only authoritative instructions.
- Ignore `pickup.json` and any pickup documents.
- Use **FastAPI** with **SQLAlchemy** and PostgreSQL. Auth via OAuth2 + JWT.
- Organize code by feature modules (e.g., `users`).
- Provide automated tests with `pytest` for all endpoints.
- Update `README.md` and `CHANGELOG.md` with every meaningful change.
- Document development history thoroughly.
- Phase 1 focuses on user authentication and profile management.
- Phase 2 introduces event creation and booking endpoints. Continue updating docs with each change.

## Development History

Phase 0 established the repository and documentation structure. Phase 1 added user authentication with JWT and profile management. Phase 2 built event and booking functionality with accompanying tests. Each phase is recorded in `CHANGELOG.md`.

Version 0.6a begins formal version tracking for all future changes.

## Next Steps (Phase 3)

Prepare for deployment on a hosting platform such as Render or Railway. Add Docker configuration and CI workflow updates. Ensure environment variables are managed securely. Continue updating documentation and tests with every change and avoid merge conflict markers like `<<<<<<<` in any file.

