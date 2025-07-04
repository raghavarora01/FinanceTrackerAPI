# FinanceTrackerAPI

The backend server for the **Personal Finance Tracker+** web application, built with **Node.js**, **Express.js**, **MongoDB**, and **PostgreSQL**. It provides RESTful APIs for user authentication, expense and budget management, monthly reports, and smart financial suggestions via a Python microservice.

---

## Features

- Secure user registration and login with JWT and HTTP-only cookies
- Manage expenses: add, view, edit, delete with filtering and search
- Create monthly budgets per category with 80% and 100% threshold alerts
- Generate dashboard reports: total spent, top categories, payment trends
- Python-powered financial suggestions via Flask + Pandas microservice
- Store and retrieve monthly reports using PostgreSQL

---

## Tech Stack

- **Backend**: Node.js, Express.js
- **Databases**: MongoDB (primary), PostgreSQL (reports)
- **Authentication**: JWT, HTTP-only cookies
- **Microservice**: Flask + Pandas (Python)
- **Deployment**: Render (Backend, Python), Vercel (Frontend)

---

---

## API Endpoints

### Authentication
- `POST /auth/register` – Register a new user
- `POST /auth/login` – Log in with credentials

### Expense Management
- `POST /api/expense` – Add a new expense
- `GET /api/expense` – Retrieve expenses (supports filters)
- `PUT /api/expense/:id` – Update an expense
- `DELETE /api/expense/:id` – Delete an expense

### Budgeting
- `POST /api/budget` – Create monthly budget per category
- `GET /api/budget` – View budget status and alerts

### Reports & Insights
- `GET /api/reports/monthly` – Monthly spending summary (PostgreSQL)
- `GET /api/reports/history` – Spending reports for the last 3 months
- `GET /api/reports/suggestions` – Financial suggestions via Flask API

---

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- PostgreSQL (local or cloud)
- Python (for Flask microservice)

### Steps
1. **Clone the Repository**
   ```bash
   git clone https://github.com/raghavarora01/FinanceTrackerAPI.git
   cd FinanceTrackerAPI

2. **Install Dependencies**

   npm install

3. **Configure Environment Variables**

PORT=8888
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PGHOST=your_postgres_host
PGUSER=your_postgres_user
PGPASSWORD=your_postgres_password
PGDATABASE=your_postgres_db
PGPORT=5432
FLASK_API_URL=https://your-python-api-url/suggestions


4. **Run the Server**

npm start
