# Author: Ambar Ubale

# Backend (Express + MongoDB)

## Setup
- Copy `.env.example` to `.env` and fill values (MONGO_URI, JWT_SECRET)
- Install dependencies:
  ```
  cd backend
  npm install
  ```
- Start:
  ```
  npm run dev
  ```

## API endpoints (base /api/v1)
- POST /auth/register
- POST /auth/login
- GET /users/me
- PUT /users/me
- CRUD /tasks

Authentication: Bearer <token>
