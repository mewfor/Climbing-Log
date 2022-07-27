const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router()

authRouter.post('/', authController.login, (req, res) => {
  res.status(200).json(res.locals.user);
})

// GET rquest for login
    // Return user info?

// POST request for login
    // return user info and success bool
    // OR return a redirect to page if succesful


module.exports = authRouter