// createUser.js
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust this path based on your project structure
require('dotenv').config(); // Load environment variables

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// Add a new user
const addUser = async (name, email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
  });

  await newUser.save();
  console.log(`User ${email} added successfully`);
};

const run = async () => {
  await connectDB();
  
  // Example: Add a user (you can customize name, email, and password)
  await addUser('doc', 'ath@gmail.com', 'ath');

  // Close the database connection
  mongoose.connection.close();
};

run();
