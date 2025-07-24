# RITUAL Platform

**Version 1.2.2**

RITUAL provides a Node.js API built with Express.js and a minimal React frontend. The backend uses SQLite for local development and JWT tokens for authentication. Earlier Python code has been removed; its history is preserved in `CHANGELOG.md`.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env` and configure the required secrets.
3. Run the tests:
   ```bash
   npm test
   ```
4. Start the development server:
   ```bash
   node src/server.js
   ```
   Or run with Docker:
   ```bash
   docker compose up --build
   ```

## Frontend

A lightweight React app lives in the `frontend` directory. To run its tests:
```bash
cd frontend && npm install && npm test
```
Open `frontend/index.html` to interact with the API during development.

## Endpoints

Current routes include:
- `POST /register` – create a user
- `POST /login` – obtain a JWT token
- `GET /me` – fetch the current user
- `PUT /me/profile` – update the user profile
- `POST /events` – create an event (club only)
- `GET /events` – list events
- `GET /events/{id}` – get a single event
- `POST /bookings` – request booking (artist only)
- `GET /my-bookings` – view bookings for the current user

## Project History and Roadmap

Development began with a Python prototype but shifted to Node.js at version 1.0.0. Phase 3 introduced Docker and CI, and Phase 4 added the React frontend. Upcoming plans in `TODO.md` cover payments, analytics and advanced features.

Consult `CHANGELOG.md` for a detailed timeline.
