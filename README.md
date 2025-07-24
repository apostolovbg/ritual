# RITUAL Backend

**Version 1.0.0**

This repository contains the backend API for the RITUAL platform. The project follows the backend-first strategy defined in `AGENTS.json`.

## Setup

1. Install Node dependencies:

```bash
npm install
```

2. Run tests:

```bash
npm test
```

3. Start the development server:

```bash
node src/server.js
```

## Versioning

This project follows [Semantic Versioning](https://semver.org). Use `npm version patch` to bump the patch version. Use `minor` or `major` for larger increments.

## Web-Based Test Runner

Tests can also be executed in the browser by opening `test/index.html`, which simply instructs you to run `npm test` from the command line.

## Documentation

- `AGENTS.md` contains development guidelines.
- `CHANGELOG.md` tracks project history.
- `TODO.md` lists upcoming development phases.

## Endpoints

Phase 1 delivered user authentication. Phase 2 added event creation and booking requests. Main routes include:

- `POST /register` — create a user
- `POST /login` — obtain a JWT token
- `GET /me` — fetch the current user
- `PUT /me/profile` — update artist or club profile
- `POST /events` — create an event (club only)
- `GET /events` — list events
- `GET /events/{id}` — get a single event
- `POST /bookings` — request booking (artist only)
- `GET /my-bookings` — view bookings for the current user

## Development Roadmap

The project has progressed through the initial phases defined in `AGENTS.json`:

- **Phase 0** – Repository setup with documentation and tests.
- **Phase 1** – User registration, login and profile management.
- **Phase 2** – Event management and booking endpoints with tests.
- **Phase 3** – Preparing for deployment on Render or Railway.

Version 1.0.0 begins the Node.js implementation and replaces the former Python codebase.
