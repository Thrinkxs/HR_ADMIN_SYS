﻿# HR_ADMIN_SYS

# HRpro - HR Administration System

HRpro is a comprehensive HR Administration System designed to manage employee details and departments efficiently. This project consists of both frontend and backend components built with Node.js and React. It provides user authentication, role-based access control, and CRUD operations for managing employees and departments.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Backend (Node.js)](#backend-nodejs)
- [Frontend (React)](#frontend-react)
- [Authentication](#authentication)
- [Role-Based Access Control](#role-based-access-control)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Deployment](#deployment)
- [Continuous Improvement](#continuous-improvement)
- [Contributing](#contributing)
- [License](#license)

## Features

- User Authentication (Admin, Manager, Employee)
- Role-Based Access Control
- Employee Management (CRUD)
- Department Management (CRUD)
- Secure Password Handling (bcrypt)
- JWT-Based Authentication
- React Frontend with Material-UI
- Scalable Node.js Backend with Express
- MongoDB Database Integration
- Responsive and User-Friendly UI

## Getting Started

### Prerequisites

Before running HRpro, ensure you have the following prerequisites installed:

- Node.js (v14+)
- npm (v6+)
- MongoDB (v4+)

### Installation

1. Clone the HRpro repository:

   ```bash
   git clone https://github.com/Thrinkxs/HR_ADMIN_SYS.git
   cd hr-admin-sys
   ```

# Install frontend dependencies

cd hr-admin-sys frontend
npm install

# Install backend dependencies

cd ../hr-admin-sys backend
npm install

# Start the backend server

cd hr-admin-sys backend
npm run dev

# Start the frontend development server

cd hr-admin-sys frontend
npm run dev

# Env Variables

PORT=3001
MONGODB_URI=mongodb://localhost/hr_admin_db // Please Key in your own credentials or request one from me
JWT_SECRET=your-secret-key // - you can generate one with crypto.randomBytes(64).toString("hex") or openssl rand -hex 64 in the terminal

///Roles

1. Admin
2. Employee
3. Manager

Admin:

1. have the highest priviledge in the app.
2. Login details: Default login, as stipulated
3. Can create employees
   Can assign managers (boolean)
4. can activate or deactivate employees and departments

Employees:

1. can login with their default password and email
2. Can view their details

Managers:

1. can login with their default password and email
2. Can view their details and employees and departments under them.

Backend (Node.js)
The backend is responsible for handling API requests and managing the MongoDB database. Built with NodeJS, Express and Typescript

Frontend (React)
The frontend is built with React and provides a user-friendly interface for HR administrators, managers, and employees. Built with React, Material UI, Tailwind and Typescript

# Authentication

HRpro supports user authentication with different roles:

Admin: Full access to all features and data.
Manager: Can manage employees and departments within their assigned departments.
Employee: Can view and update their own data but has limited access.
To log in, use the provided admin user:

Username: hradmin@test.com
Password: TestPass1234

# API Endpoints

HRpro provides various API endpoints for managing employees and departments
[SOME API Endpoint]
"api/get/employee" - Get all employees from the DB
"api/create" - Create New Employee
"/api/get/departments" - Get all department
"/api/create-department" - Create New Departments

# Run frontend tests

cd hr-admin-sys frontend
npm test

# Run backend tests

cd hr-admin-sys backend
Test locally with POSTMAN
