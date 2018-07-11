var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");

// restrict index for logged in user only
router.get('/', auth.home);


// route to register page
router.get('/register', auth.register);

// route for register action
router.post('/register', auth.doRegister);

// route to login page
router.get('/login', auth.login);

// route for login action
router.post('/login', auth.doLogin);

//homepage after login
router.get('/home', auth.homepage);


//homepage after login
router.post('/adminDashboard', auth.adminDetails);


// route for user dashboard
router.get('/user', auth.userDashboard);

// route for admin dashboard
router.get('/admin', auth.adminDashboard);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;