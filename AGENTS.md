# RITUAL Project Agent Guidelines

This repository follows **AGENTS.json** as the canonical specification for the RITUAL backend. Key points:

- Treat `AGENTS.json` as read-only authoritative instructions.
- `pickup.json` remains for historical context only. Always follow `AGENTS.json` for current requirements.
- Use **FastAPI** with **SQLAlchemy** and PostgreSQL. Auth via OAuth2 + JWT.
- Organize code by feature modules (e.g., `users`).
- Provide automated tests with `pytest` for all endpoints.
- Update `README.md` and `CHANGELOG.md` with every meaningful change.
- Document development history thoroughly.
- Phase 1 focuses on user authentication and profile management.
- Phase 2 introduces event creation and booking endpoints. Continue updating docs with each change.
- Comment code extensively in clear, human-readable language. Explain reasoning behind logic and design choices directly in the code.
- Summarize every change in `CHANGELOG.md` using the format `YYYY-MM-DD: short summary (author)`.
- Update documentation, including this file and `README.md`, whenever behavior or structure changes.
- Never insert merge conflict markers like `<<<<<<<`, `=======`, or `>>>>>>>` in any file.
- Keep code modular, well-structured and in line with best development practices.

## Development History

Phase 0 established the repository and documentation structure. Phase 1 added user authentication with JWT and profile management. Phase 2 built event and booking functionality with accompanying tests. Each phase is recorded in `CHANGELOG.md`.

Version 0.6.0 begins formal semantic version tracking for all future changes. The Python implementation will remain on the 0.x line until a refactor to a web server compatible language (planned JavaScript) reaches version **1.0.0**. That release will mark the official start of the new stack; this repository currently serves as its precursor.

## Next Steps (Phase 3)

Prepare for deployment on a hosting platform such as Render or Railway. Add Docker configuration and CI workflow updates. Ensure environment variables are managed securely. Continue updating documentation and tests with every change and avoid merge conflict markers like `<<<<<<<` in any file.

## Semantic Versioning

All components now follow [Semantic Versioning](https://semver.org). Versions use the `MAJOR.MINOR.PATCH` format. Breaking changes increment the major version, new backwards compatible features increment the minor version, and bug fixes increment the patch version. The upcoming JavaScript refactor will launch as **1.0.0**.

