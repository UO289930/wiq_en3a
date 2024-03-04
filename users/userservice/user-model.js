const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true,
      unique: true
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
      unique: true
    },
    questions_answered: {
      type: Number,
      required: false,
    },
    correctly_answered_questions: {
      type: Number,
      required: false,
    }


});

const User = mongoose.model('User', userSchema);

module.exports = User