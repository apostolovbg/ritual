# RITUAL Backend

**Version 1.2.1**

This repository hosts the Node.js implementation of the RITUAL API. Development rules are defined in `AGENTS.md`, which outlines mandatory practices and versioning guidelines. Earlier planning files such as `pickup.json` and all Python sources have been removed; their history remains in the git log and `CHANGELOG.md`.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Run tests:

```bash
npm test
```

3. Copy `.env.example` to `.env` and adjust the values:

```bash
cp .env.example .env
```

Set `JWT_SECRET` and optionally `PORT` in the `.env` file.

4. Start the development server:

```bash
node src/server.js
```

You can also build and run the service with Docker:

```bash
docker compose up --build
```

## Frontend

The `frontend` directory contains a minimal React application used for manual testing during Phase&nbsp;4. Install its dependencies and run its tests with:

```bash
cd frontend && npm install && npm test
```

Open `frontend/index.html` in a browser to interact with the API.

## Web-Based Test Runner

If you prefer a browser-based environment, open `test/index.html`. It simply instructs you to run `npm test` from the terminal but provides a friendly landing page.

## Documentation

- `AGENTS.md` &ndash; project LAWS and development history
- `CHANGELOG.md` &ndash; chronological list of releases
- `TODO.md` &ndash; roadmap for upcoming phases

## API Overview

The backend currently supports the following operations:

- `POST /register` – create a user
- `POST /login` – obtain a JWT token
- `GET /me` – retrieve the current user
- `PUT /me/profile` – update artist or club profile
- `POST /events` – create an event (club only)
- `GET /events` – list events
- `GET /events/{id}` – get a single event
- `POST /bookings` – request booking (artist only)
- `GET /my-bookings` – view bookings for the current user

## Development History

Version 1.0.0 marked the transition from the original Python backend to Node.js with Express. Version 1.1.0 added Docker support and a CI workflow. Version 1.2.0 introduced a React frontend, and version 1.2.1 updated testing dependencies.

## Roadmap

The next milestones are outlined in `TODO.md` and include deployment preparation, payment integration, analytics, notifications, AI-based recommendations and final production hardening.

