# RITUAL Project Agent Guidelines

The following LAWS govern development of the RITUAL platform. These rules are **read-only** and must not be altered. They originate from the initial project specification and remain in force:

- Treat `AGENTS.json` as read-only authoritative instructions.
- The historical file `pickup.json` has been removed. Always follow `AGENTS.json` for current requirements.
- Use **Express.js** with **SQLite** for local deployments. Auth via OAuth2 style JWT tokens.
- Organize code by feature modules (e.g., `users`).
- Provide automated tests with `jest` for all endpoints.
- Update `README.md` and `CHANGELOG.md` with every meaningful change.
- Document development history thoroughly.
- Phase 1 focuses on user authentication and profile management.
- Phase 2 introduces event creation and booking endpoints. Continue updating docs with each change.
- Comment code extensively in clear, human-readable language. Explain reasoning behind logic and design choices directly in the code.
- Summarize every change in `CHANGELOG.md` using the format `YYYY-MM-DD: short summary (author)`.
- Update documentation, including this file and `README.md`, whenever behavior or structure changes.
- Never insert merge conflict markers like `<<<<<<<`, `=======`, or `>>>>>>>` in any file.
- Keep code modular, well-structured and in line with best development practices.
- Keep all documentation current. Every commit must update the docs to reflect the latest state of the project. Maintaining documentation is a mandatory sub-task for all contributors.

**Do not modify the above LAWS in future documentation updates.**

## Development History

Phase 0 established the repository and documentation structure. Phase 1 added user authentication with JWT and profile management. Phase 2 built event and booking functionality with accompanying tests. Version 1.0.0 marked the migration from the earlier Python codebase to a JavaScript stack using Express.js. Version 1.1.0 introduced Docker and CI configuration. Version 1.2.0 shipped the initial React frontend, and version 1.2.1 fixed test dependencies and updated documentation.
Phase 4 delivered a responsive React interface. Phases 5 and 6 introduced placeholder endpoints for payments, analytics, notifications, AI recommendations and blockchain rewards to map out future integrations.

## Current State

RITUAL now runs entirely on Node.js with Express and stores data in SQLite. The API exposes user, profile, event and booking endpoints secured by JWT tokens. Experimental routes outline payments, analytics, notifications, AI recommendations and blockchain rewards. Automated tests are written with Jest and Supertest. A responsive React frontend in the `frontend` directory demonstrates registration, login and event booking flows. Docker and GitHub Actions provide a reproducible development environment.

## Future Roadmap

Upcoming work focuses on deployment, feature expansion and production hardening:

- **Phase 3 – Deployment Preparation**: finalize Docker setup, add a `.env` file for secrets and document hosting steps.
- **Phase 4 – Basic Frontend**: responsive React implementation with Tailwind styling and tests.
- **Phase 5 – Feature Expansion**: integrate payments, analytics and user notifications.
- **Phase 6 – Advanced Functionality**: prototype AI-based recommendations and explore blockchain rewards.
- **Phase 7 – Production Hardening**: perform security audits, consider PostgreSQL and document compliance requirements.

## Semantic Versioning

All components follow [Semantic Versioning](https://semver.org) using the `MAJOR.MINOR.PATCH` scheme. Breaking changes increment the major version, new features increment the minor version and bug fixes increment the patch version.
