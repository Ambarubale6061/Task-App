# Task App

# Author: Ambar Ubale

This archive contains a minimal fullstack project meant for a 3-day intern assignment:

- `backend/` — Node.js + Express + Mongoose (MongoDB)
- `frontend/` — Next.js minimal UI

## Quick start (local)

1. Start MongoDB (e.g., mongod)
2. Backend:
   - cd backend
   - copy `.env.example` to `.env` and fill values
   - npm install
   - npm run dev
3. Frontend:
   - cd frontend
   - copy `.env.example` to `.env.local` and set NEXT_PUBLIC_API_URL to backend (e.g. http://localhost:5000)
   - npm install
   - npm run dev

## Deliverables included

- Working authentication (register/login) with JWT
- Protected routes (backend protect middleware + frontend checks)
- CRUD for tasks with search filter
- Password hashing with bcrypt
- Postman collection (postman_collection.json)
- README files and environment examples

## Notes on scaling for production

- Move secrets to a secrets manager (AWS Secrets Manager / Vault)
- Use HTTPS + secure cookies or short-lived JWT + refresh tokens (rotate tokens)
- Use connection pooling & read replicas for DB; employ migrations and schema versioning
- Add rate limiting, input sanitization, logging (winston) and monitoring (Prometheus + Grafana)
- Containerize (Docker) and orchestrate with Kubernetes; use auto-scaling groups behind a load balancer
- Serve frontend as static build on CDN (Vercel/Netlify) and backend behind API gateway with caching (Redis)
- Split services: auth service, user service, tasks service (microservices) when team grows
