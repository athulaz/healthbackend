const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const authorizationRoutes = require('./routes/authorizationRoutes');

const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Parse JSON request bodies

// Routes
app.use('/api/auth', authRoutes);  // Authentication routes
app.use('/api/patients', patientRoutes);  // Patient routes
app.use('/api/authorizations', authorizationRoutes);  // Authorization routes

module.exports = app;
