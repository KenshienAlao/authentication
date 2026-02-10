# 🔐 JWT Authentication System

A simple authentication system built with **Next.js**, **Node.js**, **Express**, and **MySQL**. This project demonstrates a full-stack implementation of JSON Web Token (JWT) authentication.

---

## 🚀 Features

- **User Registration**: Secure signup with password hashing using `bcrypt`.
- **JWT Authentication**: Secure login issuing a JSON Web Token for stateless authentication.
- **Protected Routes**: Dashboard and user info routes that require a valid JWT.
- **Database Persistence**: User data stored securely in a **MySQL** database.

---

## 🛠️ Tech Stack

### Frontend

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## 📦 Getting Started

### 1. Prerequisites

- Node.js installed
- MySQL server running

### 2. Configuration

Create a `.env` file in the `backend` directory:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=auth_db
JWT_SECRET=your_super_secret_key
```

### 3. Installation

**Backend:**

```bash
cd backend
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

---

## 🔑 Key Concepts

### JSON Web Token (JWT)

The system follows a standard JWT flow:

1. User logs in with credentials.
2. Server verifies credentials and signs a JWT containing the user ID.
3. Client stores the JWT in `localStorage`.
4. Client sends the JWT in the `Authorization` header for protected requests.

### SQL Database (MySQL)

The project uses a structured SQL table for users:

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 📄 License

This project is just simple authentication system and free to use.
