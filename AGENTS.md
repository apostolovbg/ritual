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

