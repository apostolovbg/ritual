# RITUAL Web App

**Version 1.6.0**

This repository hosts the full stack implementation of the RITUAL web application. Development rules are defined in `AGENTS.md`, which outlines mandatory practices and versioning guidelines. Earlier planning files such as `pickup.json` and all Python sources have been removed; their history remains in the git log and `CHANGELOG.md`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run tests (a fallback JWT secret is supplied automatically):

```bash
npm test
```

3. Copy `.env.example` to `.env` and adjust the values:

```bash
cp .env.example .env
```

Set `JWT_SECRET` (required— the server will not start without it) and optionally `PORT` in the `.env` file.

4. Start the development server:

```bash
node src/server.js
```

SQLite now enforces foreign key constraints and uses `ON DELETE CASCADE` so related profiles, events and bookings are automatically removed when a user or event is deleted.
As a result, tests reset the database by deleting from `users`, which cascades to all dependent tables.

You can also build and run the service with Docker:

```bash
docker compose up --build
```

## Frontend

Static pages for operational testing live in the `public` directory. Open `public/index.html` in a browser while the server is running to interact with the API.

The React application under `frontend` now offers the same features with a richer interface. Users can edit their entire profile, browse all artists or venues and view public profiles. Information persists so details remain after logging out and back in.

Install the frontend dependencies and run its tests with:

```bash
cd frontend && npm install && npm test
```


## Web-Based Test Runner

If you prefer a browser-based environment, open `test/index.html`. It simply instructs you to run `npm test` from the terminal but provides a friendly landing page.

## Documentation

- `AGENTS.md` &ndash; project LAWS and development history
- `CHANGELOG.md` &ndash; chronological list of releases
- `TODO.md` &ndash; roadmap for upcoming phases
- `src/middleware/auth.js` &ndash; reusable JWT authentication middleware

## API Overview

The backend currently supports the following operations:

- `POST /register` – create a user
- `POST /login` – obtain a JWT token
- `GET /me` – retrieve the current user
- `PUT /me/profile` – update artist or club profile (email can be changed too)
- `GET /me/profile` – retrieve the current profile
- `POST /events` – create an event (club only)
- `PUT /events/{id}` – update an event (club only)
- `GET /events` – list events
- `GET /events/{id}` – get a single event
- `POST /bookings` – request booking (artist only)
- `GET /my-bookings` – view bookings for the current user
- `GET /artists` – list artist profiles
- `GET /clubs` – list venue profiles
- `GET /profiles/{id}` – get a single public profile
- `GET /clubs/{id}/events` – list events for a club

Registration and event creation endpoints validate input and return helpful
HTTP 400 messages when required fields are missing or incorrectly formatted.
Unauthorized or role-mismatched requests, such as duplicate registrations,
bad login attempts, or booking with the wrong account type, return 400–403
errors with descriptive messages.

## Development History

Version 1.0.0 marked the transition from the original Python backend to Node.js with Express. Version 1.1.0 added Docker support and a CI workflow. Version 1.2.0 introduced a React frontend, and version 1.2.1 updated testing dependencies.

## Roadmap

The next milestones are outlined in `TODO.md` and include deployment preparation, payment integration, analytics, notifications, AI-based recommendations and final production hardening.

