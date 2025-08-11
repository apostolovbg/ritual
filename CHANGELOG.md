# Changelog

All notable changes to this project will be documented in this file.

2025-08-11: Added user test cleanup for bookings, events, and profiles before user deletion (assistant)
2025-08-11: Added tests for duplicate registration, bad login, and unauthorized event or booking actions (assistant)
2025-08-11: Enabled SQLite foreign key enforcement to maintain relational integrity (assistant)
2025-08-11: Centralized JWT auth middleware for reuse across routers (assistant)
2025-08-11: Enforced presence of JWT_SECRET via centralized config utility (assistant)
2025-08-11: Added input validation for registration and event routes (assistant)

## [1.3.0] - 2025-07-24
### Added
- Static `public` directory with `index.html` and JavaScript for manual API testing.
- Express now serves this directory to provide a basic zero-trust frontend scaffold.
### Changed
- Bumped package version and updated README to reflect full web application scope.

## [1.4.0] - 2025-07-24
### Added
- Profile retrieval endpoint and artist/club listing APIs.
- Event editing endpoint with date and time fields.
- Frontend navigation improvements with logout and public user lists.
### Changed
- Database schema expanded for detailed profiles and events.
- Documentation updated for new endpoints and version.

## [1.5.0] - 2025-07-24
### Added
- Public profile endpoint and venue event listing API.
- Extensive artist and venue profile forms in the static frontend.
- Event management UI with editing capabilities for venues.
- Clickable artist and venue lists with profile display.
### Changed
- Navigation now adapts to the logged-in role.
- Tests expanded for the new endpoints.

## [1.5.1] - 2025-07-24
### Fixed
- Profile editing now updates the account email
- Artist and venue lists display profile IDs
- Logged-in users see their ID on the profile page
### Changed
- Frontend reloads profile data after saving

## [1.5.2] - 2025-07-24
### Added
- React frontend now supports full profile forms for artists and venues.
- Public lists of artists and venues with links to profile views.
### Changed
- README updated for persistent profile features.

## [1.2.1] - 2025-07-27
### Fixed
- Added missing testing library dependencies.
- Updated version number and documentation.
### Changed
- Removed legacy Python code and refreshed documentation.

## [1.2.0] - 2025-07-26
### Added
- React frontend with basic forms for registration, login, profile editing, event creation and booking.
- Frontend unit tests using React Testing Library.
### Changed
- Documentation updated for new frontend and version bump.

## [1.1.0] - 2025-07-25
### Added
- Dockerfile and docker-compose for containerized development.
- GitHub Actions workflow for CI.
- `.env.example` and environment variable support via `dotenv`.
### Removed
- Deprecated files `pickup.json` and `requirements.txt`.
### Changed
- Updated documentation and added code comments for clarity.

## [1.0.0] - 2025-07-24
### Added
- Node.js implementation replacing the Python FastAPI code.
- SQLite storage and JWT-based authentication.
- Jest test suite for API endpoints.
- Updated documentation and versioning instructions.
2025-07-24: Added TODO.md with roadmap for upcoming development (codex)

## [0.6a] - 2025-06-14
### Added
- Browser-based test runner using Pyodide (`test/index.html`).
- Documentation updated to version 0.6a.

2025-07-24: Adopted Semantic Versioning and updated docs for upcoming refactor (codex)

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
