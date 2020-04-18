const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: true,
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 45,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
});

mongoose.model('User', UserSchema);
