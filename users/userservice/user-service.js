const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user-model')



// GET route to retrieve an specific user by username
// 'http://localhost:8002/getOneUser?username=nombre_de_usuario'

router.get('/getUser', async (req, res) => {
  try {
      
      // access to the database 
      const db = mongoose.connection.useDb("UsersDB");
      
      // access to the collection of the database
      const userCollection = db.collection('User');
      
      userCollection.findOne({ username: req.body.username }, function(err, result) {
        if (err) {
          console.error('Error finding user:', err);
        } else {
          console.log('User:', result);
          // Cerrar la conexión después de terminar la consulta
          mongoose.connection.close();
        }
      });
      
  } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
    }
}

function validateUsername(username){
  
  //if (!username.trim()) {
  //    throw new Error('The username cannot be empty or contain only spaces');
  //}

  if (username.trim().length < 4) {
    throw new Error('The username must be at least 4 characters long');
  }
} 

function validateEmail(email){
    // regular expression to validate the email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      throw new Error('Invalid email address');
    }
}

function validatePassword(password){
  
  if (password.trim().length < 8) {
      throw new Error('The password must be at least 8 characters long');
  }
  if (!/\d/.test(password)) {
      throw new Error('The password must contain at least one numeric character');
  }
  if (!/[A-Z]/.test(password)) {
      throw new Error('The password must contain at least one uppercase letter');
  }
}


router.post('/adduser', async (req, res) => {
    try {
        console.log('Register /userservice')
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password', 'email']);

        // validate username, email and password fields
        validateUsername(req.body.username);
        validateEmail(req.body.email);
        validatePassword(req.body.password);
      
        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            questions_answered: 0,
            correctly_answered_questions: 0
        });

        // access to the database 
        const db = mongoose.connection.useDb("UsersDB");
        
        // access to the collection of the database
        const userCollection = db.collection('User');
        await userCollection.insertOne(newUser);

        res.json(newUser.username);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});




// edit a user to update the total and correct question answered
router.post('/editUser', async (req, res) => {
  try {

      // --- find the user to be updated
      const db = mongoose.connection.useDb("UsersDB"); // database
      const userCollection = db.collection('User');    // collection
      
      let userToUpdate = await userCollection.findOne({ username: req.body.username });
      if (!userToUpdate) {
        return res.status(404).json({ error: 'User not found' });
      }

      // --- update the fields 
      userToUpdate.questions_answered = userToUpdate.questions_answered + req.body.questions_answered;
      userToUpdate.correctly_answered_questions = userToUpdate.correctly_answered_questions + req.body.correctly_answered_questions;

      // --- update the user in the database
      await userCollection.updateOne({ username: userToUpdate.username }, { $set: userToUpdate });
      return res.json({ message: 'User updated' });

  } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;