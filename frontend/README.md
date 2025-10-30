# Author: Ambar Ubale

# Frontend (Next.js / Tailwindcss)

## Setup

- Copy `.env.example` to `.env.local` and set NEXT_PUBLIC_API_URL to backend (e.g. http://localhost:5000)
- Install:
  ```
  cd frontend
  npm install
  ```
- Run:
  ```
  npm run dev
  ```

This is a minimal UI to demonstrate authentication + CRUD. Expand styling (Tailwind/Material UI) as needed.

## Tailwind

Run `npx tailwindcss -i ./styles/input.css -o ./styles/tailwind.css --watch` or use `npm run build:css` before starting Next.js if you want prebuilt CSS.
