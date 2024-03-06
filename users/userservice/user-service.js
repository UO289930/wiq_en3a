const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('./user-model') // user model 


// Get all users - not working
router.get('/allUsers', async (req, res) => {
  try {
    // Obtener todos los usuarios usando el modelo User
    const allUsers = await User.find();

    // Objeto JSON con la lista de usuarios
    const allUsersJSON = {
      users: allUsers
    };

    res.json(allUsersJSON);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


// GET route to retrieve an specific user by username
// 'http://localhost:8001/getOneUser?username=nombre_de_usuario'

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
      //const users = await User.find(); // Retrieve all users from the database
      //console.log("Users:", users); // Print users in the terminal
      //res.json(users); // Send the array of users as JSON response
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


router.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'password', 'email']);

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



module.exports = router;