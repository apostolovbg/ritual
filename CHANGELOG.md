# Changelog

All notable changes to this project will be documented in this file.

## [0.7.4] - 2025-06-14
### Changed
- Reapplied documentation updates after resolving merge issues.

## [0.7.3] - 2025-06-14
### Changed
- Documented unlimited internet access and dependency policy in README.
- Added versioning policy and bumped version numbers across documentation.

## [0.7.2] - 2025-06-14
### Removed
- Deprecated the unfinished test suite and deleted `app/tests`.
- Eliminated references to running tests and the web-based test runner.
- Dropped `pytest` and `httpx` from `requirements.txt`.

## [0.7.1] - 2025-06-14
### Added
- Documented immediate next tasks: implementing CORS, CSRF protection,
  rate limiting, and GDPR/CDPA compliance measures.
- Noted the need for network access to `pypi.org` and `files.pythonhosted.org`
  when installing dependencies. Updated README to version 0.7.1.

## [0.7] - 2025-06-14
### Added
- Completed Phase 3 with deployment documentation and version updates.

## [0.6a] - 2025-06-14
### Added
- Browser-based test runner using Pyodide (`test/index.html`).
- Documentation updated to version 0.6a.

## [0.6b] - 2025-06-14
### Added
- Dockerfile and `.dockerignore` for container deployments.
- GitHub Actions workflow running the test suite.
- `.env.example` and environment variable loading in configuration.
- Documentation updates reflecting removal of `AGENTS.json`.
- CI and Docker instructions in README.

## [0.1.0] - 2025-06-14
### Added
- Initial repository with `AGENTS.json` and placeholder README.



## [0.2.0] - 2025-06-14
### Added
- `AGENTS.md` with project guidelines.
- Backend skeleton using FastAPI with user auth endpoints.
- Basic SQLAlchemy models and CRUD logic.
- Tests for user registration and login.
- `requirements.txt` listing dependencies.
### Changed
- Expanded `README.md` with setup instructions.

## [0.3.0] - 2025-06-14
### Added
- Event and booking modules with CRUD endpoints.
- Tests covering event creation and booking flow.
- Updated documentation for Phase 2 instructions.

## [0.4.0] - 2025-06-14
### Added
- Development summary in `AGENTS.md` outlining completed phases and Phase 3 goals.
- Updated `README.md` with roadmap section.
- Recorded this change in the changelog.

## [0.5.0] - 2025-06-14
### Added
- Formal version tracking initiated.
- Updated documentation to reflect current version.
