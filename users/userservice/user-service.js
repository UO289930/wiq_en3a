// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')

const app = express();
const port = 8001;

// Middleware to parse JSON in request bodyUsersDB
app.use(bodyParser.json());
 

// Connect to MongoDB - testing
const mongoUri = 'mongodb+srv://prueba:prueba@cluster0.kjzbhst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoUri).then(
  console.log('Succesfully connected to MongoDB')
);


// GET route to retrieve all users - not working
app.get('/users', async (req, res) => {
  try {
      const users = await User.find(); // Retrieve all users from the database
      console.log("Users:", users); // Print users in the terminal
      res.json(users); // Send the array of users as JSON response
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}


app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password']);

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server