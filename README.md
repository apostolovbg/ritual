# RITUAL Backend

**Version 0.6a**

This repository contains the backend API for the RITUAL platform. The project follows the backend-first strategy defined in `AGENTS.json`.

## Setup

1. Create a virtual environment and install dependencies:

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

2. Run tests:

```bash
pytest -q
```

3. Start the development server:

```bash
uvicorn app.main:app --reload
```

## Web-Based Test Runner

A simple test runner is available under `test/index.html`. Serve the repository with Python's built-in web server and open the page in your browser:

```bash
python -m http.server
```

Then visit `http://localhost:8000/test/index.html` and click **Run Tests** to execute the suite using Pyodide.

## Documentation

- `AGENTS.md` contains development guidelines.
- `CHANGELOG.md` tracks project history.

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

Version 0.6a marks the addition of a browser-based test runner.
