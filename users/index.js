// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

// app and port definition
const app = express();
const port = 8003;

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI

mongoose.connect(mongoUri).then(
  console.log('Succesfully connected to MongoDB')
);


// Routes
const authRoutes = require('./authservice/auth-service.js');
const userRoutes = require('./userservice/user-service.js');


// Middlewares added to the application
app.use(bodyParser.json());

// Routes middlewares to be used
app.use('/auth', authRoutes);
app.use('/user', userRoutes);


// Start the server
const server = app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}`);
  });

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });


module.exports = { app, server };