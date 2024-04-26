const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

// POST SIGNUP
router.post('/signup', usersController.postSignUp);

// POST Login
router.post('/login', usersController.postLogin, usersController.verifyToken);

//Exportera routers
module.exports = router;
