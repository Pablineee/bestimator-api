// Import necessary libraries
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// Import database connection
const sequelize = require('./config/db');

// Import necessary models
const User = require("./models/user");
const Client = require("./models/client");
const Material = require("./models/material");
const Estimate = require("./models/estimate");

// Import necessary routes
const materialRoutes = require('./routes/materialRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const estimateRoutes = require('./routes/estimateRoutes');

// Initialize Express app
const app = express();

// Implement middleware
app.use(express.json());

// Define API routes
app.use('/materials', materialRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/estimates', estimateRoutes);

// Set necessary environment variables
const SERVER_PORT = process.env.PORT || 4000;

// Function used to Sync database and start server
const startServer = async () => {
    try {
        await sequelize.sync({ alter: true }); // Sync DB schema
        console.log("Database Synced Successfully");

        app.listen(SERVER_PORT, () =>
            console.log(`Server running on http://localhost:${SERVER_PORT}`)
        );
    } catch (err) {
        console.error(`Database Sync Error: ${err.message}`);
        process.exit(1); // Exit on database sync failure
    }
};

// Start the server
startServer();