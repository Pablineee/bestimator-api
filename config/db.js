const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT || 5432,
    database: process.env.DB_NAME
});

pool.on("connect", () => {
    console.log('PostgreSQL Connected...');
});

pool.on("error", (err) => {
    console.error(`PostgreSQL Connection Error: ${err.message}`);
});

module.exports = {
    query: (text, params) => pool.query(text, params)
};