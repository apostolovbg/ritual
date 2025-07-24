# RITUAL Backend

**Version 1.2.0**

This repository contains the backend API for the RITUAL platform. The project follows the backend-first strategy defined in `AGENTS.json`.
Previous planning files `pickup.json` and `requirements.txt` have been removed as they are no longer relevant to the Node.js implementation.

## Setup

1. Install Node dependencies:

```bash
npm install
```

2. Run tests:

```bash
npm test
```

3. Copy `.env.example` to `.env` and set the required secrets.

4. Start the development server:

```bash
node src/server.js
```

Alternatively you can run the service with Docker:

```bash
docker compose up --build
```

## Frontend

The `frontend` folder contains a minimal React application used during Phase 4.
Install its dependencies and run the tests with:

```bash
cd frontend && npm install && npm test
```

Open `frontend/index.html` in the browser to interact with the UI. It communicates with the backend described above.

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

Version 1.2.0 introduces a basic React frontend alongside the existing Node.js backend.
