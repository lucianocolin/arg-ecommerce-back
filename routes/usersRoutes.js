const express = require('express');
const { getUsers, createUser } = require('../controllers/usersController');

const router = express.Router();

router.route('/')
  .get(getUsers)
  .post(createUser)

module.exports = router;