# 🧑‍💻 Collaborative Task Manager – Full-Stack Application

A **production-ready, full-stack Task Management application** with authentication, real-time collaboration, and responsive UI.
Built as part of a **Full-Stack Engineering Assessment**.

---

## 🚀 Live Demo

**Frontend (Next.js – Vercel):**
👉 [https://task-app-nine-lovat.vercel.app/login](https://task-app-nine-lovat.vercel.app/login)

**Backend API (Node + Express – Render):**
👉 [https://task-app-backend-uzmc.onrender.com](https://task-app-backend-uzmc.onrender.com)

---

## 🖼️ Application Screenshots

> Below are some key screens from the live application showcasing core functionality and UI.

### 📊 Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### ✅ Tasks Management

![Tasks Screenshot](./screenshots/tasks.png)

### 👤 User Profile

![Profile Screenshot](./screenshots/profile.png)

> 📌 Note: Screenshots are taken from the live deployed application.

---

## 🧰 Tech Stack

### Frontend

- Next.js (Pages Router)
- React Query v5
- Tailwind CSS
- Socket.io Client
- React Hook Form

### Backend

- Node.js + Express
- MongoDB + Mongoose
- Socket.io
- JWT Authentication
- bcrypt for password hashing

---

## 📁 Project Structure

```
TASK-APP/
├── backend/
│   ├── src/
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Task.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── user.js
│   │   │   └── task.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── frontend/
│   ├── pages/
│   │   ├── login.js
│   │   ├── register.js
│   │   ├── dashboard.js
│   │   ├── tasks.js
│   │   └── profile.js
│   ├── components/
│   ├── utils/api.js
│   ├── styles/
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication & Authorization

- User Registration & Login
- Passwords hashed using **bcrypt**
- JWT-based authentication
- Protected routes using middleware

---

## 📋 Task Management (CRUD)

Each task includes:

- title
- description
- dueDate
- priority (Low, Medium, High, Urgent)
- status (To Do, In Progress, Review, Completed)
- creatorId
- assignedToId

Features:

- Full CRUD operations
- Filtering by status & priority
- Sorting by due date
- Overdue task detection

---

## ⚡ Real-Time Collaboration (Socket.io)

- Live task updates across users
- Instant assignment notifications
- Real-time sync without page refresh

---

## 📊 Dashboard

- Tasks assigned to the current user
- Tasks created by the user
- Overdue tasks
- Real-time updates

---

## 🔄 Data Fetching & State Management

- React Query v5
- Centralized `apiFetch()` utility
- Automatic caching and revalidation

---

## 🧪 Testing

- Backend unit tests using Jest
- Critical business logic covered

---

## 🧠 Architecture & Design Decisions

### Why MongoDB?

- Flexible schema
- Faster development
- Easy relationship handling

### Architecture

- Routes → Controllers → Models
- Middleware for auth protection
- Clean separation of concerns

---

## 🧑‍💻 API Endpoints

### Auth

```
POST /api/v1/auth/register
POST /api/v1/auth/login
```

### Tasks

```
GET    /api/v1/tasks
POST   /api/v1/tasks
GET    /api/v1/tasks/:id
PUT    /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
```

---

## ⚙️ Setup Instructions (Local)

### Backend

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open: [http://localhost:3000](http://localhost:3000)

---

## 🌍 Deployment

- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas

---

## 👨‍🎓 Author

**Ambar Ubale**
GitHub: [https://github.com/Ambarubale6061](https://github.com/Ambarubale6061)
