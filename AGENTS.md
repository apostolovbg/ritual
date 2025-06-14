-# RITUAL Project Agent Guidelines

`AGENTS.json` has been removed. This document now serves as the primary reference for development. Key points:

- Ignore `pickup.json` and any other pickup documents.
- Use **FastAPI** with **SQLAlchemy** and PostgreSQL. Auth via OAuth2 + JWT.
- Organize code by feature modules (e.g., `users`, `events`).
- Provide automated tests with `pytest` for all endpoints.
- Keep documentation (`README.md`, `CHANGELOG.md`) up to date with every change.
- Maintain a clear development history in this file.
- Phase 1 implemented authentication and profile management.
- Phase 2 added event creation and booking endpoints.

## Development History

Phase 0 established the repository and documentation structure. Phase 1 added user authentication with JWT and profile management. Phase 2 built event and booking functionality with accompanying tests. Each phase is recorded in `CHANGELOG.md`.

Version 0.6a introduced a browser-based test runner. Version 0.6b adds Docker support, environment variable loading from `.env`, and a CI workflow. Version 0.7 finalizes Phase 3 with deployment documentation and version updates.

## Phase 3 Complete

Deployment readiness is implemented with Docker support, `.dockerignore`, a CI workflow running `pytest`, and configuration loading from `.env`. Documentation now covers container usage and environment variables.

## Next Steps

Phase 4 planning will outline additional features and improvements beyond deployment.

