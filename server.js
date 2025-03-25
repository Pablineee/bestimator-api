// Import necessary libraries
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

// Import Sequelize and models from centralized models/index.js
const { sequelize, Sequelize, User,  Client, Material, Estimate, JobType, Unit, connectDB } = require('./models/index');

// Import necessary routes
const materialRoutes = require('./routes/materialRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const estimateRoutes = require('./routes/estimateRoutes');
const unitRoutes = require('./routes/unitRoutes');
const jobTypeRoutes = require('./routes/jobTypeRoutes');
const provinceWeightRoutes = require('./routes/provinceWeightRoutes');
const swaggerRoutes = require('./routes/swaggerRoutes');

// Import Clerk authentication utility
const { clerkAuth } = require('./utils/clerkAuth');

// Initialize Express app
const app = express();

// Implement middleware
app.use(express.json());
// app.use(clerkMiddleware());
app.use(cors({ origin: process.env.FRONTEND_URL }));

// Unprotected API routes
app.use('/api-docs', swaggerRoutes);

// Protected API routes - For use with Clerk authorization headers
app.use('/v1/materials', clerkAuth, materialRoutes);
app.use('/v1/users', clerkAuth, userRoutes);
app.use('/v1/clients', clerkAuth, clientRoutes);
app.use('/v1/estimates', clerkAuth, estimateRoutes);
app.use('/v1/units', clerkAuth, unitRoutes);
app.use('/v1/job-types', clerkAuth, jobTypeRoutes);
app.use('/v1/province-weights', clerkAuth, provinceWeightRoutes);

// Set necessary environment variables
const SERVER_PORT = process.env.PORT || 4000;

// Function used to Sync database and start server
const startServer = async () => {
    try {
        await connectDB(); // Connect to PostgreSQL database instance
        console.log("Database Synced Successfully");

        app.listen(SERVER_PORT, '0.0.0.0', () => {
            console.log(`Server running on http://0.0.0.0:${SERVER_PORT}`);
        });
    } catch (err) {
        console.error(`Database Sync Error: ${err.message}`);
        process.exit(1); // Exit on database sync failure
    }
};

// Start the server
startServer();