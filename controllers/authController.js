const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signUp = async(req, res) =>{
  try {
    const newUser = await User.create({
      username: req.body.username,
      mail: req.body.mail,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    const token = jwt.sign(
      { id: newUser._id },
      process.env.SECRET_TOKEN,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.status(201).json({ ok: true, data: newUser })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha fallado', error })
  }
}

module.exports = {signUp}