# RITUAL Project Agent Guidelines

This document is the canonical specification for the project. The former `AGENTS.json` file was removed when the stack switched from Python to Node.js. Follow the rules below when contributing.

## Core Rules
- Use **Express.js** with **SQLite** for local development. JWT tokens handle authentication.
- Keep code organized by feature modules (e.g., `users`, `events`).
- Provide automated tests with **jest** for backend and frontend code.
- Comment logic clearly and explain design choices within the code.
- Summarize every change in `CHANGELOG.md` with the format `YYYY-MM-DD: short summary (author)`.
- **Documentation Law**: update `README.md`, `CHANGELOG.md`, `TODO.md` and any related docs with every commit so they always describe the current state and future plans. Keeping documentation accurate is part of every task.
- Never add merge conflict markers (`<<<<<<<`, `=======`, `>>>>>>>`).
- Maintain modular, well-structured code that follows best practices.

## Development History
- **Phase 0** – Repository and documentation structure established.
- **Phase 1** – User authentication and profile management.
- **Phase 2** – Event creation and booking endpoints with tests.
- **Phase 3** – Docker configuration and CI workflow for deployment prep.
- **Phase 4** – React frontend added.
- **Version 1.2.2** – Removed all Python-era files; project is fully Node.js/React.

Future milestones are tracked in `TODO.md`.
