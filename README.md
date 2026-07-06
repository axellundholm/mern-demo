# MERN Demo

A small MERN application for onboarding customers through Adyen's Legal
Entity Management and Balance Platform APIs.

## Project structure

- `backend/` – Express API, MongoDB models via Mongoose, Adyen integration.
- `frontend/` – React (Vite) single-page app.

## Prerequisites

- Node.js 20+
- A running MongoDB instance (or use `docker-compose up mongo`)
- Adyen test API keys for Legal Entity Management and Balance Platform

## Setup

1. Copy the environment templates and fill in real values:

   ```bash
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```

2. Install dependencies for both apps:

   ```bash
   npm run install:all
   ```

## Running locally

Run both the backend and frontend together:

```bash
npm run dev
```

Or individually:

```bash
npm run dev:backend
npm run dev:frontend
```

The backend listens on `http://localhost:3000` (configurable via `PORT`) and
the frontend dev server runs on `http://localhost:5173`.

## Running with Docker Compose

```bash
docker compose up --build
```

This starts MongoDB, the backend, and the frontend together.

## Testing and linting

```bash
npm test   # runs backend and frontend test suites
npm run lint
```
