# Mini-CRM for Freelancers

## Overview

This project is a **Mini-CRM platform** designed for freelancers to manage their clients, projects, interaction logs, and reminders. The system features secure authentication, a user-friendly frontend with light/dark mode, and a structured backend using JWT for authentication. This application enables freelancers to track their clients and projects effectively, and even handle reminders for meetings, calls, or follow-ups.

---
### Test User: 
 - email:maisha@gmail.com
   password: 123456
## Tech Stack

### **Frontend**:
- **React** with **TypeScript**: For building a dynamic, type-safe frontend.
- **React Hook Form**: For handling forms with easy validation and data handling.
- **Zod**: For client-side form validation alongside React Hook Form.
- **TanStack Query** (formerly React Query): For efficient data fetching and caching.
- **Axios**: For making HTTP requests to the backend API.
- **TailwindCSS**: For styling with a focus on utility-first CSS and responsive design.

### **Backend**:
- **Node.js** with **Express**: For building a robust and scalable REST API with TypeScript.
- **Prisma ORM**: For interacting with the PostgreSQL database in an easy-to-use, type-safe way.
- **PostgreSQL**: For storing user data, clients, projects, interaction logs, and reminders.
- **Zod**: For server-side validation of incoming request data.
- **JWT** (JSON Web Tokens): For user authentication and authorization, securely stored in cookies.

---

## Project Features

### **Authentication:**
- **Signup & Login** functionality: Users can sign up and log in with their email and password.
- Passwords are securely hashed using **bcrypt**, and authentication is handled with **JWT** tokens.
- The JWT is stored in cookies for session management, providing an additional layer of security.
- **Protected Routes**: All routes are protected by authentication middleware to ensure only authenticated users can access their data.

### **Clients:**
- **CRUD Operations**: Users can Create, Read, Update, and Delete clients associated with their profile.
- Each client includes the following fields:
  - Required: **Name**, **Email**, **Phone**
  - Optional: **Company**, **Notes**
- **Client Data Privacy**: Each user can only manage their own clients.

### **Projects:**
- A **Project** is tied to a specific **Client**.
- **CRUD Operations**: Projects support full CRUD functionality.
- Each project includes:
  - Required: **Title**, **Budget**, **Deadline**, **Status**
- Project statuses can be categorized as: "In Progress", "Completed", "Pending", etc.
- Projects are displayed according to their status to provide better organization.

### **Reminders:**
- **Reminders** are tied to clients and projects.
- These remind freelancers about important follow-ups, meetings, or calls.
- The reminder includes:
  - **Date**, **Interaction Type** (e.g., call, meeting), and **Notes**.
- Reminders help even when no project exists for a client but there’s still important communication to track.
- A **summary of upcoming reminders** is displayed on the dashboard.

### **Dashboard:**
- The **Dashboard** provides a snapshot of the user's activity:
  - **Total Clients**
  - **Total Projects**
  - **Reminders** due soon
  - **Projects by Status** (e.g., Pending, Completed, In Progress)

---

## Detailed Implementation

### **Authentication & Authorization**:
For secure user authentication, I used **JWT (JSON Web Tokens)** to handle user sessions. After logging in, the backend sends a JWT token which is then stored in the user’s **cookies**. The token is sent along with each subsequent request to authenticate the user.

- **JWT Token**: Chose JWT because it’s stateless and allows easy scaling of the system (no need for session storage). Storing it in cookies makes the system less vulnerable to cross-site scripting (XSS) attacks compared to local storage.
- **Middleware**: I used a middleware to verify the JWT token for every request that requires authentication. This ensures that only authenticated users can access their own data.

### **Connecting Reminders with Clients**:
In this system, **reminders are connected to clients** instead of just projects. This approach is intentional to accommodate situations where there might not be any ongoing project with a client but the freelancer still needs to track follow-ups or discussions that occurred prior to or after a project. For example, a freelancer might have a reminder for a **meeting** with a client even if there is no active project.

- **Why Link Reminders to Clients?**: By linking reminders directly to clients, we ensure that all communications with a client, whether or not there is an active project, are captured and tracked. This is important for freelancers who may have informal interactions before the official start of a project or after it’s completed.

### **Database Schema (PostgreSQL)**:
I designed the database schema with the following relationships:
- **User**: Each user has their own set of clients, projects, and reminders.
- **Client**: Clients can have multiple projects, and users can create, update, and delete their clients.
- **Project**: Projects belong to clients, and each project contains required fields such as title, budget, and status.
- **Reminder**: Reminders can be associated with either a project or a client, ensuring that the freelancer can track important interactions regardless of the project's status.

Here’s a basic **ERD**:
- **User** (1) ↔ (M) **Client**
- **Client** (1) ↔ (M) **Project**
- **Client** (1) ↔ (M) **Reminder**
- **Project** (1) ↔ (M) **Reminder**

### **Form Validation**:
- I used **Zod** for both client-side and server-side validation. On the frontend, **React Hook Form** integrates with Zod to handle form submissions and validation seamlessly.
- **Zod** ensures that invalid data is rejected at the earliest point, which reduces errors and improves overall system reliability.

---

---

## Installation & Setup

### Prerequisites
- **Node.js** (v16 or higher)
- **PostgreSQL** database
- **Docker** (Optional, for containerization)

### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/mini-crm.git
    cd mini-crm
    ```

2. **Install Backend Dependencies**:
    ```bash
    cd backend
    npm install
    ```

3. **Set up PostgreSQL Database**:
   - Create a PostgreSQL database and update the connection URL in the `.env` file.
   - If using **Docker**, you can run a PostgreSQL container with `docker-compose`.

4. **Run Prisma Migrations**:
    ```bash
    npx prisma migrate dev
    ```

5. **Install Frontend Dependencies**:
    ```bash
    cd frontend
    npm install
    ```

6. **Configure Environment Variables**:
    - In the **backend** directory, create a `.env` file:
    ```
    DATABASE_URL=postgresql://user:password@localhost:5432/mydb
    JWT_SECRET=mySecretKey
    ```

7. **Run the Application**:
    - **Backend**:
      ```bash
      npm run dev
      ```
    - **Frontend**:
      ```bash
      npm run dev
      ```

8. **Access the Application**:
    <!-- - Visit the frontend at `http://localhost:3000` -->
    - Backend API is accessible at `https://furniturehub-eta.vercel.app/api/v1`

---









