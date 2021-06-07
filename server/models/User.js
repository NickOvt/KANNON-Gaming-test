const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User MongoDB(mongoose) Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  coins: {
    type: Number,
    required: false,
    default: 20
  }
});

module.exports = User = mongoose.model('user', UserSchema);