const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./auth-model');


// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}
 
// Route for user login
router.post('/login', async (req, res) => {
  try {

    // Check if required fields are present in the request body
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Check if required fields are present in the request body
    validateRequiredFields(req, ['username', 'password']);

    const { username, password } = req.body;

    let user;
    try {
      user = await User.findOne({ username });
    } catch (err) { 
      throw new Error('Error finding the user')
    }

    // Check if the user exists and verify the password
    if (user && await bcrypt.compare(password, user.password)) {
      // Generate a JWT token
      const token = jwt.sign({ username: user.username, userEmail: user.email, questions_answered: user.questions_answered, correctly_answered_questions: user.correctly_answered_questions }, 'your-secret-key', { expiresIn: '1h' });
      // Respond with the token that has all the user information
      res.json({ token: token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router