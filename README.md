# 🧑‍💼 Mini User Management System

A full-stack **User Management System** built to demonstrate secure authentication, role-based access control (RBAC), clean API design, and modern frontend UI practices.  
This project was developed as part of a technical assessment for **Purple Merit Technologies**.

---

## 🌐 Live Deployment

**Frontend (Vercel)**  
https://usermangement-project.vercel.app/

**Backend API (Render)**  
https://deploy2-zu1w.onrender.com/

---

## 📌 Project Overview

The **Mini User Management System** is a web application that manages user accounts with different roles and permissions.  
It supports secure authentication, role-based authorization, and basic user lifecycle management.

The project demonstrates real-world full-stack skills including backend API development, authentication security, frontend UI/UX, database design, and cloud deployment.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User signup and login
- JWT-based authentication
- Secure password hashing using bcrypt
- Protected routes
- Role-based access control (Admin / User)

### 👤 User Features
- View own profile
- Update full name and email
- Change password securely
- Logout functionality

### 🛠️ Admin Features
- View all users in a paginated table
- Activate and deactivate user accounts
- View user roles and account status
- Admin-only dashboard access

### 🎨 UI / UX
- Responsive design (desktop & mobile)
- Clean admin dashboard layout
- Toast notifications for success & errors
- Confirmation dialogs for destructive actions
- Loading indicators during API calls

---

## 🛠️ Tech Stack

### Frontend
- React (Hooks)
- React Router
- Axios
- Tailwind CSS
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Tokens (JWT)
- bcrypt

### Deployment & Tools
- Frontend: Vercel
- Backend: Render
- Database: MongoDB Atlas
- Version Control: Git & GitHub

---

## 📁 Project Structure

```
mini-user-management/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── models/
│   │   └── app.js
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── routes/
│   │   └── api/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions (Local Development)

### 1️⃣ Clone the Repository
```bash
git clone <your-repository-url>
cd mini-user-management
```

---

### 2️⃣ Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory.

Start the backend server:
```bash
npm run dev
```

Backend runs on:
```
http://localhost:5000
```

---

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

---

## 🔐 Environment Variables

Create a `.env` file in the **backend** directory with the following variables:

```env
PORT=
MONGO_URI=
JWT_SECRET=
```

Sensitive values are excluded from the repository using `.gitignore`.

---

## 🚀 Deployment Instructions

### Backend Deployment (Render)
1. Push backend code to GitHub
2. Create a new Web Service on Render
3. Connect the GitHub repository
4. Set environment variables in Render dashboard
5. Deploy the service

### Frontend Deployment (Vercel)
1. Push frontend code to GitHub
2. Import the repository into Vercel
3. Configure environment variables if required
4. Deploy the application

---

## 📡 API Documentation

### 🔑 Authentication Routes

#### Signup
POST `/api/auth/signup`

```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### Login
POST `/api/auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

#### Logout
POST `/api/auth/logout`

---

### 👤 User Routes

- GET `/api/users/me`
- PUT `/api/users/me`
- PUT `/api/users/change-password`

---

### 🛠️ Admin Routes (Admin Only)

- GET `/api/admin/users?page=1`
- PATCH `/api/admin/users/:id/activate`
- PATCH `/api/admin/users/:id/deactivate`

---

## 🧪 Testing

- Backend unit tests for authentication and protected routes
- Manual API testing using Postman
- UI testing for role-based access and user flows

---

## ✅ Assessment Coverage

- Authentication & authorization
- Role-based access control (RBAC)
- Secure password hashing
- Protected routes
- Pagination
- Clean UI & UX
- Cloud deployment
- Environment-based configuration

---

## 👩‍💻 Developed By

**Spandana**  
B.Tech - Artificial Intelligence & Machine Learning  
