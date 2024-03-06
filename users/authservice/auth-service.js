const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model')
const cors = require('cors');

const app = express();
const port = 8002; 


app.use(cors());
// Middleware to parse JSON in request body
app.use(express.json());

// Connect to MongoDB
// Connect to MongoDB - testing
const mongoUri = 'mongodb+srv://prueba:prueba@cluster0.kjzbhst.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


// Connect to the database
mongoose.connect(mongoUri).then(
  console.log('Succesfully connected to MongoDB')
);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

// Route for user login
app.post('/login', async (req, res) => {
  try {

    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    // access to the database 
    const db = mongoose.connection.useDb("UsersDB");
      
    // access to the collection of the database
    const userCollection = db.collection('User');

    let user;
    
    await userCollection.findOne({ username: req.body.username }, function(err, result) {
      if (err) {
        console.error('Error finding user:', err);
      } else {
        user = result;
      }
    });

    console.log(user);

    // Check if the user exists and verify the password
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ username: user.username, userEmail: user.email, questions_answered: user.questions_answered, correctly_answered_questions: user.correctly_answered_questions }, 'your-secret-key', { expiresIn: '1h' });
      // Respond with the token and user information
      res.json({ token: token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Auth Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
  });

module.exports = server
