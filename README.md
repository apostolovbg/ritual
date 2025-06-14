# RITUAL Backend

This repository contains the backend API for the RITUAL platform. The project follows a backend-first approach described in `AGENTS.json`.
This repository contains the backend API for the RITUAL platform. The project fo
llows a backend-first approach described in `AGENTS.json`.

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

Phase 1 delivers user authentication. Phase 2 adds event creation and booking requests. Main routes include:

- `POST /register` — create a user
- `POST /login` — obtain a JWT token
- `GET /me` — fetch the current user
- `PUT /me/profile` — update artist or club profile
- `POST /events` — create an event (club only)
- `GET /events` — list events
- `GET /events/{id}` — get a single event
- `POST /bookings` — request booking (artist only)
- `GET /my-bookings` — view bookings for the current user
