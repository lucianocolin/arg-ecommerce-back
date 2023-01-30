const User = require('../models/User');

const getUsers = async(req, res) =>{
  try {
    const users = await User.find({})
    return res.status(200).json({ ok: true, users })
  } catch (error) {
    return res.status(500).json({ message: 'El servidor ha fallado' })
  }
};

const createUser = async(req, res) =>{
  try {
    const newUser = new User({ ...req.body });
    newUser.save();
    return res.status(201).json({ ok: true, newUser })
  } catch (error) {
    return res.status(500).json({ message: 'El servidor ha fallado' })
  }
}

module.exports = {
  getUsers,
  createUser
};