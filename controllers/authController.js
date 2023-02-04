const User = require('../models/User');
const { signToken } = require('../utils/token');
require('dotenv').config();

const signUp = async(req, res) =>{
  try {
    const newUser = await User.create({
      username: req.body.username,
      mail: req.body.mail,
      password: req.body.password,
      confirmPassword: req.body.confirmPassword
    });
    const token = signToken(newUser._id);
    res.status(201).json({
      ok: true,
      token: token,
      data: newUser })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha fallado', error })
  }
}

const logIn = async(req, res) =>{
  try {
    const { mail, password } = req.body;
    if(!mail || !password){ 
      res.status(400).json({ ok: false, message: "Bad request" })
     }

    const user = await User.findOne({ mail }).select('+password');
    if( !user || !(await user.comparePassword(password, user.password)) ){
      return res.status(401).json({ ok: false, msg: "Credenciales incorrectas" })
    }

    const token = signToken(user._id);
    return res.status(200).json({ 
      ok: true,
      token: token,
      data: {
        user
      }
     })
  } catch (error) {
    res.status(500).json({ message: 'El servidor ha fallado', error })
  }
}

module.exports = {
  signUp,
  logIn
};