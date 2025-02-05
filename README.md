# 🚀 Phoenix : IMF Gadget API Development Challenge

Welcome to the **IMF Gadget API** – a powerful backend for managing mission-critical gadgets, built with **Node.js, Express.js, TypeScript, Prisma, and PostgreSQL**.

## 📌 Features

✅ **User Authentication** (Signup, Login, Logout)  
✅ **Gadget Management** (Create, Update, Delete, List)  
✅ **Mission Success Probability Calculation**  
✅ **Gadget Self-Destruct Functionality**  
✅ **Role-based Access Control**  
✅ **Secure API with JWT Authentication**  
✅ **Data Validation with Zod**

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js** - Backend framework
- **TypeScript** - Type safety
- **Prisma ORM** - Database interaction
- **PostgreSQL** - Database
- **Zod** - Input validation
- **JWT** - Authentication
- **bcrypt** - Password hashing

## 📌 API Routes

### 🔐 Authentication (`/api/auth`)

| Method | Endpoint  | Description         | Protected |
| ------ | --------- | ------------------- | --------- |
| `POST` | `/signup` | Register a new user | ❌        |
| `POST` | `/login`  | Authenticate a user | ❌        |
| `POST` | `/logout` | Logout the user     | ✅        |

### 🛠 Gadgets (`/api/gadgets`)

| Method   | Endpoint             | Description                                | Protected |
| -------- | -------------------- | ------------------------------------------ | --------- |
| `GET`    | `/`                  | Fetch all gadgets (optional status filter) | ✅        |
| `POST`   | `/`                  | Add a new gadget                           | ✅        |
| `PATCH`  | `/:id`               | Update a gadget                            | ✅        |
| `DELETE` | `/:id`               | Decommission a gadget                      | ✅        |
| `POST`   | `/:id/self-destruct` | Self-destruct a gadget (irreversible)      | ✅        |

---

## ⚡ Getting Started

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Heismanish/mission-imf.git
cd mission-imf
```

2️⃣ Install Dependencies

```sh
npm install
```

3️⃣ Setup Environment Variables
Create a .env file and configure:

```env
PORT=3000
DATABASE_URL=your_postgresql_url
JWT_SECRET=your_secret_key
CLIENT_URL=http://localhost:5173
```

4️⃣ Run the Development Server (make sure you have typescript installed)

```sh
npm run dev
```

## 📖 API Documentation

📌 [Postman Documentation here...](https://documenter.getpostman.com/view/29128305/2sAYX6p27J)

## 🔐 Authentication & Authorization

Uses JWT tokens stored in cookies for authentication.
Protected routes require a valid token.
Users can be either agents or admins with role-based access control.
