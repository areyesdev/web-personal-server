const bcrypt = require('bcrypt-nodejs');
const User = require('../models/user');

function signUp(req, res) {
  console.log('Endpoint de signUp ejecutado');
}

module.exports = {
  signUp
}