# RITUAL Web App

**Version 1.7.1**

This repository hosts the full stack implementation of the RITUAL web application. Development rules are defined in `AGENTS.md`, which outlines mandatory practices and versioning guidelines. Earlier planning files such as `pickup.json` and all Python sources have been removed; their history remains in the git log and `CHANGELOG.md`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and adjust the values:

```bash
cp .env.example .env
```

Set `JWT_SECRET` (required— the server will not start without it) and optionally `PORT` in the `.env` file.

3. Run the backend test suite (a fallback JWT secret is supplied automatically):

```bash
npm test
```

SQLite now enforces foreign key constraints and uses `ON DELETE CASCADE` so related profiles, events and bookings are automatically removed when a user or event is deleted.
As a result, tests reset the database by deleting from `users`, which cascades to all dependent tables.

## Running the Development Servers

### Backend

Start the Express API once the tests pass:

```bash
node src/server.js
```

The server listens on the port defined in `.env` (default `3000`). You can also build and run the service with Docker:

```bash
docker compose up --build
```

### Frontend

Launch a lightweight server for the React frontend in a separate terminal:

```bash
cd frontend
npm install
npx serve -l 5173
```

Then open <http://localhost:5173> in your browser. The app will proxy API requests to the backend at `http://localhost:3000`.

## Testing

Run tests for both layers before committing:

```bash
npm test                   # backend
cd frontend && npm test    # frontend
```

## Development Guidelines

Adhere to the project LAWS in `AGENTS.md` and the following conventions:

- Favor clear, descriptive comments even for straightforward logic.
- Keep modules focused on a single feature and export reusable pieces.
- Run `npm test` and `cd frontend && npm test` before committing.
- Bump version numbers and update `CHANGELOG.md` and `README.md` with every change.

## Frontend

Static pages for operational testing live in the `public` directory. Open `public/index.html` in a browser while the server is running to interact with the API.

The React application under `frontend` now mirrors those features with a modern, responsive design. The navigation bar collapses into a mobile-friendly hamburger menu and all forms scale cleanly across screen sizes. Users can edit their entire profile, browse all artists or venues and view public profiles. Information persists so details remain after logging out and back in.

To develop the frontend, follow the steps in [Running the Development Servers](#running-the-development-servers) and consult the [Testing](#testing) section for how to execute its Jest suite.


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
- `POST /payments/checkout` – simulate payment processing
- `GET /analytics/summary` – retrieve basic in-memory metrics
- `POST /notifications/email` – stub endpoint acknowledging email requests
- `GET /recommendations` – sample AI-generated event suggestions
- `GET /rewards/{userId}` – mock blockchain token balance

These experimental endpoints return mock data and serve as placeholders for future integrations.

Registration and event creation endpoints validate input and return helpful
HTTP 400 messages when required fields are missing or incorrectly formatted.
Unauthorized or role-mismatched requests, such as duplicate registrations,
bad login attempts, or booking with the wrong account type, return 400–403
errors with descriptive messages.

## Development History

Version 1.0.0 marked the transition from the original Python backend to Node.js with Express. Version 1.1.0 added Docker support and a CI workflow. Version 1.2.0 introduced a React frontend, and version 1.2.1 updated testing dependencies.

## Roadmap

The next milestones are outlined in `TODO.md` and include deployment preparation, payment integration, analytics, notifications, AI-based recommendations and final production hardening.

