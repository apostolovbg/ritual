# RITUAL Backend

**Version 0.5.0**

This repository contains the backend API for the RITUAL platform. The project follows a backend-first approach described in `AGENTS.json`.

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

The project has progressed through the initial phases of the plan defined in `AGENTS.json`:

- **Phase 0** – Repository setup with documentation and tests.
- **Phase 1** – User registration, login and profile management.
- **Phase 2** – Event management and booking endpoints with tests.

Next up is **Phase 3**, which focuses on preparing deployment via a provider such as Render or Railway. Docker setup and CI workflows will be introduced.

Version 0.5.0 marks the beginning of formal version tracking for this repository.

