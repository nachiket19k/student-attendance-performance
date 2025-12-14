# Student Attendance & Performance Manager (MERN)

A production-ready MERN web application for managing students, attendance, marks, and performance reports.

## Tech Stack

- **Frontend**: React 18, Vite, React Router v6, Material UI, Axios, React Chart.js 2
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv, CORS
- **Database**: MongoDB Atlas (recommended)

## Project Structure

```text
DBMSPROJECT1/
  backend/
    config/
    controllers/
    middleware/
    models/
    routes/
    .env.example
    package.json
    server.js
  frontend/
    src/
      api/
      components/
      context/
      pages/
    index.html
    package.json
    vite.config.mts
  README.md
```

## Backend Setup

1. Navigate to backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file based on `.env.example`:

   ```bash
   cp .env.example .env
   ```

3. Update `MONGO_URI`, `JWT_SECRET`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` as needed.

4. Start the backend (development):

   ```bash
   npm run dev
   ```

   The API will run on `http://localhost:5000` by default.

## Frontend Setup

1. In a separate terminal, navigate to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Create a `.env` file to override API base URL:

   ```bash
   echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env
   ```

3. Start the frontend dev server:

   ```bash
   npm run dev
   ```

   Vite will run on `http://localhost:5173` by default.

## Default Admin Login

- Email: value of `ADMIN_EMAIL` from backend `.env`
- Password: value of `ADMIN_PASSWORD` from backend `.env`

On first backend start, the admin is seeded automatically if it does not exist.

## Core Features

- **Authentication**: Admin login with JWT, password hashing
- **Student Management**: Add, list, search, edit, delete students
- **Attendance Management**: Mark attendance by date, view records, attendance percentage per student
- **Marks Management**: Add/edit subject marks, view marks per student
- **Reports Dashboard**:
  - Attendance percentage per student
  - Students with \< 75% attendance
  - Top performers by marks
  - Charts powered by Chart.js via React Chart.js 2

## Production Notes

- Configure a production MongoDB Atlas cluster and update `MONGO_URI`.
- Use strong `JWT_SECRET` and admin credentials.
- For production, build the frontend (`npm run build` in `frontend`) and serve via a static host, or configure a reverse proxy (Nginx) to route `/api` to the backend and the rest to the frontend.
