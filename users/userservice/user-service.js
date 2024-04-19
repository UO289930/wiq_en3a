const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user-model')





// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
  for (const field of requiredFields) {
    if (!(field in req.body)) {
      return res.status(400).json({ error: 'Username and password are required' });
    }
  }
}


// GET route to retrieve an specific user by username

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


/**
 * This method checks if the user already exists in the database
 */
async function checkUsername(req) {
  // access to the database and its collection
  const db = mongoose.connection.useDb("UsersDB");
  const userCollection = db.collection('User');

  const user = await userCollection.findOne({username: req.body.username});
  if(user !== null){
    throw new Error('The username already exists in the database')
  }
}



/**
 * POST route to add a new user to the database
 */
router.post('/adduser', async (req, res) => {
    try {

        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password', 'email']);

        // check if the username is already in the database
        await checkUsername(req);

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



/**
 * POST route to edit a user to update the total and correct question answered
 */
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


/**
 * GET route to retrieve all the users in the database
 */
router.get('/getAllUsers', async (req, res) => {
  try {
    // access the UsersDB database
    const db = mongoose.connection.useDb("UsersDB");

    // access the User collection
    const userCollection = db.collection('User');

    // Find all users
    const users = await userCollection.find({}).toArray();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});




module.exports = router;