const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    email: {
      type: String,
      required: true,
    },
    questions_answered: {
      type: int,
      required: true, 
    },
    correctly_answered_questions: {
      type: int,
      required: false,
    }




});

const User = mongoose.model('User', userSchema);

module.exports = User