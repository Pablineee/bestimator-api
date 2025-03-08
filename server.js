// Import necessary libraries
const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

// Import necessary routes
const materialRoutes = require('./routes/materialRoutes');
const userRoutes = require('./routes/userRoutes');
const clientRoutes = require('./routes/clientRoutes');
const estimateRoutes = require('./routes/estimateRoutes');

// Implement Express.js middleware and routing
const app = express();
app.use(express.json());
app.use('/materials', materialRoutes);
app.use('/users', userRoutes);
app.use('/clients', clientRoutes);
app.use('/estimates', estimateRoutes);

// Set necessary environment variables
const SERVER_PORT = process.env.PORT || 4000;