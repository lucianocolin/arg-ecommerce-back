const jwt = require('jsonwebtoken');
require('dotenv').config();

const signToken = (id) =>{
  return jwt.sign(
    { id },
    process.env.SECRET_TOKEN,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  )
};

module.exports = {signToken};