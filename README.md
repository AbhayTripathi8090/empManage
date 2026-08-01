# Industry-Standard Employee Management System

A full-stack, enterprise-grade Employee Management System built with a decoupled **client** and **server** setup adhering to **Feature-Based Architecture**.

---

## Technology Stack

### Frontend (`client/`)
- **Core Framework**: React 19 + Vite
- **State Management**: Redux Toolkit & Redux Thunk (`createAsyncThunk`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Form Validation**: React Hook Form (`react-hook-form`)
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios with Request & Response Interceptors
- **Iconography**: Lucide React (`lucide-react`)

### Backend (`server/`)
- **Runtime & Framework**: Node.js & Express.js
- **Database & Modeling**: MongoDB & Mongoose
- **Authentication**: JSON Web Tokens (`jsonwebtoken`) & `bcryptjs`
- **File Uploads & Media Storage**: Multer & Cloudinary SDK
- **Security & Utilities**: CORS, `cookie-parser`, `dotenv`, `express-validator`

---

## Feature Highlights

- 🔐 **Authentication & Security**:
  - JWT Authentication supporting `Authorization: Bearer` headers and HTTP-only cookies.
  - Password hashing via `bcryptjs` pre-save hooks.
  - Protected routes on client & server with automatic post-login redirection and persistent auth state.
- 👥 **Employee Directory Management**:
  - Full CRUD operations (Create, Read, Update, Delete).
  - Server-side pagination metadata (`totalCount`, `totalPages`, `currentPage`, `limit`).
  - Debounced multi-field regex search (`firstName`, `lastName`, `email`, `designation`).
  - Department and Status filtering (`Active`, `Inactive`, `On Leave`).
- ☁️ **Cloudinary Profile Image Integration**:
  - JPG, JPEG, PNG, and WEBP image uploads limited to 5 MB.
  - Automatic replacement and deletion of old images from Cloudinary upon profile update or record deletion.
- 🎨 **Responsive Modern UI**:
  - Responsive layout for Mobile, Tablet, and Desktop screens.
  - Mobile slide-out navigation drawer with backdrop blur.
  - Reusable UI Components: `Button`, `Input`, `Select`, `Modal`, `Loader`, `EmptyState`.
  - Reusable **Delete Confirmation Modal** replacing all native browser dialogs.

---

## Directory Structure

```text
empAssessment/
├── client/
│   ├── src/
│   │   ├── app/
│   │   │   └── store.js             # Redux Store Configuration
│   │   ├── components/
│   │   │   ├── common/              # Reusable UI (Button, Input, Select, Modal, Loader, EmptyState)
│   │   │   └── layout/              # Navbar, Sidebar, MobileSidebar, MainLayout
│   │   ├── features/
│   │   │   ├── auth/                # Auth Slice, Thunk, Selector, LoginPage, RegisterPage
│   │   │   ├── dashboard/           # DashboardPage, StatsCard
│   │   │   ├── departments/         # departmentSlice, DepartmentPage
│   │   │   ├── employees/           # employeeSlice, employeeThunk, employeeSelector, EmployeeListPage, EmployeeForm
│   │   │   └── profile/             # ProfilePage, ProfileDetailsForm, ChangePasswordForm
│   │   ├── routes/
│   │   │   ├── AppRoutes.jsx        # Route definitions
│   │   │   └── ProtectedRoute.jsx   # Route guard
│   │   ├── services/
│   │   │   ├── api.js               # Reusable Axios Instance & Interceptors
│   │   │   ├── authApi.js           # Auth HTTP API calls
│   │   │   ├── employeeApi.js       # Employee HTTP API calls
│   │   │   └── profileApi.js        # Profile HTTP API calls
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── package.json
│   └── vite.config.ts
│
└── server/
    ├── src/
    │   ├── config/                  # MongoDB & Cloudinary SDK setup
    │   ├── features/
    │   │   ├── auth/                # controller, routes, model, service, validation
    │   │   ├── departments/         # controller, routes, model, service
    │   │   └── employees/           # controller, routes, model, service, validation
    │   ├── middlewares/             # auth, upload (Multer), error middleware
    │   ├── routes/                  # Central Router (/api/v1)
    │   ├── utils/                   # asyncHandler, apiResponse, apiError, jwt, cloudinary helpers
    │   ├── app.js                   # Express app setup
    │   └── server.js                # Server entry point
    ├── .env.example
    └── package.json
```

---

## Installation & Setup Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- MongoDB service running locally (`mongodb://127.0.0.1:27017`) or a MongoDB Atlas connection string.

### 2. Backend Setup (`server/`)
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```
The server will run on `http://localhost:5000`.

### 3. Frontend Setup (`client/`)
```bash
# Open a new terminal and navigate to client directory
cd client

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env

# Start development server
npm run dev
```
The client application will run on `http://localhost:5173`.

---

## API Documentation

Base URL: `http://localhost:5000/api/v1`

### Authentication Endpoints (`/auth`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/register` | Public | Registers a new user. Body: `{ name, email, password, role }` |
| `POST` | `/auth/login` | Public | Authenticates user. Body: `{ email, password }` |
| `POST` | `/auth/logout` | Private | Invalidates token cookie and session. |
| `GET` | `/auth/me` | Private | Returns current user profile object. |
| `PUT` | `/auth/profile` | Private | Updates user name/email & uploads avatar file to Cloudinary. |
| `PUT` | `/auth/change-password` | Private | Body: `{ currentPassword, newPassword }` |

### Employee Endpoints (`/employees`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/employees` | Private | Returns paginated list. Query: `page`, `limit`, `search`, `department`, `status` |
| `GET` | `/employees/:id` | Private | Returns single employee details with populated department. |
| `POST` | `/employees` | Admin / Manager | Creates new employee record (supports `multipart/form-data` with `profileImage`). |
| `PUT` | `/employees/:id` | Admin / Manager | Updates employee record (replaces Cloudinary image if new file attached). |
| `DELETE` | `/employees/:id` | Admin | Deletes employee record and removes associated Cloudinary image. |

### System Health

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Returns `{ status: 'OK', message: 'Employee Management API Server is running smoothly' }` |
