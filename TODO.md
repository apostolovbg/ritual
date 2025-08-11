# Development Plan

This document outlines the remaining phases required to make the RITUAL project fully functional and ready for deployment. The plan expands on the guidelines in `AGENTS.md`. The previously referenced `pickup.json` file has been removed.

## Phase 3 – Deployment Preparation
- **Containerization**: Create a Dockerfile for the Node.js backend and define a `docker-compose.yml` for local development. Ensure SQLite data is persisted via a volume.
- **Environment Management**: Introduce a `.env` file and update the code to read secrets (e.g., `JWT_SECRET`) from environment variables. Document all required variables in the README.
- **Continuous Integration**: Add a GitHub Actions workflow that installs dependencies, runs `npm test`, and builds the Docker image. Use this workflow to verify pull requests.
- **Hosting Setup**: Choose a service such as Render or Railway and configure deployment. Store configuration details in the repository documentation.

## Phase 4 – Basic Frontend
- Completed: basic React app with context-based auth, Tailwind styling, and Jest tests covering login interactions.
- Added responsive navigation and form styling for a modern, mobile-friendly interface.

## Phase 5 – Feature Expansion
- **Payment and Booking Enhancements**: Placeholder `/payments/checkout` endpoint simulates payment processing. Future work will integrate a provider such as Stripe and extend booking flows.
- **Analytics**: Basic `/analytics/summary` endpoint exposes in-memory counters. Next steps include wiring to Mixpanel or similar.
- **User Notifications**: Stub `/notifications/email` endpoint acknowledges requests. A real service like SendGrid will be added later.

## Phase 6 – Advanced Functionality
- **AI Modules**: Prototype `/recommendations` endpoint returns sample suggestions. Future iterations will incorporate real ML models.
- **Blockchain Integration**: Placeholder `/rewards/{userId}` endpoint returns mock token balances. Smart contract integration remains future work.

## Phase 7 – Production Hardening
- **Security Audits**: Perform penetration testing, add 2FA support, and review compliance requirements (GDPR, CCPA, SOC 2 Type II, ISO 27001) originally documented in `pickup.json`.
- **Scalability Review**: Plan migration from SQLite to PostgreSQL for production. Evaluate container orchestration options if the service grows.
- **Documentation**: Ensure all API endpoints and deployment steps are fully documented. Maintain examples for local and hosted environments.

## Milestones
1. **Backend Deployment** – Dockerized service running on Render/Railway with CI in place.
2. **Minimal Frontend** – React interface covering all current API features.
3. **Feature Complete Beta** – Payment, analytics, and notifications integrated.
4. **Full Platform Release** – AI modules, blockchain components, and security/compliance measures implemented.

