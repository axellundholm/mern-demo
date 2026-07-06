# MERN Demo Improvement Plan

A plan to improve the `mern-demo-master` structure, grouped by priority and
focused on correctness, security, and maintainability.

## 1. Critical bugs and correctness

- **Fix the model name mismatch.** `customerModel.js` registers the schema as
  `mongoose.model("Cat", ...)` while the intent is "Customer". Rename to
  `"Customer"` so the Mongo collection is `customers`, not `cats`.
- **Fix undefined `response` references.** In `customerRoute.js`, the `PUT` and
  `DELETE` catch blocks call `response.status(...)` but the param is named
  `res`. This throws a `ReferenceError` on any error path. Change to `res`.
- **Add input validation guards.** `POST /customers` accesses
  `req.body.organization.legalName` without checking `req.body.organization`
  exists first, so a missing `organization` crashes with a TypeError instead of
  returning 400.

## 2. Security and configuration

- **Lock down CORS.** `app.use(cors())` allows all origins. Restrict to the
  frontend origin (the commented-out block already shows the intent).
- **Verify secrets handling.** Confirm `.env` (with `LEM_API_KEY`,
  `BCL_API_KEY`, `MONGODB_URL`, `PORT`) is gitignored and add a committed
  `.env.example` documenting required vars.
- **Centralize the API base URL on the frontend.** Every page hardcodes
  `http://localhost:3000`. Move to a Vite env var (`VITE_API_URL`) and a shared
  Axios instance.

## 3. Backend architecture

- **Introduce a service/controller split.** `customerRoute.js` mixes routing,
  Adyen calls, validation, and DB access. Extract:
  `controllers/customerController.js`, `services/adyenService.js`,
  `services/customerService.js`.
- **Add centralized error handling.** Replace the repeated try/catch +
  `console.log` with an Express error-handling middleware and an async wrapper.
- **Add a config module** that validates required env vars at startup (fail fast
  if missing).
- **Add request logging** (e.g. `morgan`) and structured responses.

## 4. Frontend completeness and structure

- **Implement the stub pages.** `EditCustomer.jsx` and `DeleteCustomer.jsx` are
  placeholders; wire them to the existing `PUT`/`DELETE` endpoints.
- **Extract a shared API layer** (`src/api/customers.js`) so pages don't each
  construct Axios calls.
- **Add error/empty UI states.** Currently errors just `alert()` or
  `console.log`; add user-facing error and "no customers" states.
- **Consider a data-fetching hook** (custom `useCustomers`) or React Query to
  remove duplicated loading logic.

## 5. Tooling and quality

- **Add ESLint/Prettier to the backend** (frontend already has ESLint).
- **Add tests** (Jest/Vitest + supertest for routes, React Testing Library for
  components).
- **Add a root-level setup:** a top-level `README` with run instructions and
  optionally a `docker-compose.yml` (Mongo + backend + frontend) or a root
  `package.json` with concurrent dev scripts.

## Suggested sequencing

1. Fix critical bugs (section 1) - quick, high impact.
2. Security + config (section 2).
3. Backend refactor (section 3).
4. Frontend completion (section 4).
5. Tooling/tests (section 5).
