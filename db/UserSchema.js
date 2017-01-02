require('../config');

const userCollection=require('mongoose');
const validator = require('validator');
const _ = require('lodash');

userCollection.connect(process.env.SESSION_URI);

var UserSchema = new userCollection.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  }
});

var User = userCollection.model('User', UserSchema);

User.find().then((todos) => {
    console.log({todos});
  }, (e) => {
    console.log(e);
  });
module.exports = {User};
