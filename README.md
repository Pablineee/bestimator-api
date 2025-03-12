
# Bestimator API

_The Bestimator API is a backend service designed to automate and simplify construction cost estimation._

## How to Install Locally

### 1. Clone the Repository
```bash
git clone https://github.com/Pablineee/bestimator-api.git
```

### 2. Install Dependencies
Navigate into the project directory and install all required packages:
```bash
cd bestimator-api
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory with the following content:
```env
PORT=4000
DATABASE_URL=postgres_database_url
```

> **Note:**
> - `DATABASE_URL` should point to your PostgreSQL instance.

### 4. Run Database Migrations
To create the database schema, run:
```bash
npx sequelize-cli db:migrate
```

### 5. Start the Server
To start the server, run:
```bash
npm start
```
or
```bash
node server.js
```

> The API should now be running on `http://localhost:4000`.

---

## Usage

- **API Base URL**: `http://localhost:4000/v1`
- **Swagger Documentation** is available at: `http://localhost:4000/api-docs`.