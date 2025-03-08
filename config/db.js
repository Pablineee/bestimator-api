const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
    logging: false, // Disable logging of SQL querries
    define: {
        schema: "bestimator"
    },
    pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000,
    },
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("Connected to PostgreSQL...");
    } catch (error) {
        console.error(`Connection Error: ${error.message}`);
        process.exit(1); // Exit if database connection fails
    }
};

connectDB();

module.exports = sequelize;