// Import necessary libraries
const express = require('express');
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

// Import Clerk authentication utility
const clerkAuth = require('./utils/clerkAuth');

// Initialize Express app
const app = express();

// Implement middleware
app.use(express.json());

// Define API routes (Unprotected)
app.use('/materials', materialRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/estimates', estimateRoutes);
app.use('/units', unitRoutes);
app.use('/job-types', jobTypeRoutes);
app.use('/province-weights', provinceWeightRoutes);

// Protected API routes - For use with Clerk authorization headers
/*
    Will leave commented until neccessary clerk 
    middleware is implemented in frontend API requests

app.use('/materials', clerkAuth, materialRoutes);
app.use('/users', clerkAuth, userRoutes);
app.use('/clients', clerkAuth, clientRoutes);
app.use('/estimates', clerkAuth, estimateRoutes);
app.use('/units', clerkAuth, unitRoutes);
app.use('/job-types', clerkAuth, jobTypeRoutes);
app.use('/province-weights', clerkAuth, provinceWeightRoutes);

*/

// Set necessary environment variables
const SERVER_PORT = process.env.PORT || 4000;

// Function used to Sync database and start server
const startServer = async () => {
    try {
        await connectDB(); // Connect to PostgreSQL database instance
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

// ---------- Testing Purposes -------------

// Request is successful (no authentication)
app.get('/test', (req, res) => {
    return res.json({ message: 'Success' });
});

// Endpoint uses Clerk Authentication
// Will return error, unless Clerk authorization headers are included in API request
app.get('/test-auth', clerkAuth, (req, res) => {
    return res.json({ message: 'Success' });
});