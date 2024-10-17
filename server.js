const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');  // MongoDB connection
const app = require('./app');  // Importing the Express app

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
