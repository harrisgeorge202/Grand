var mongoose = require("mongoose");
var passport = require("passport");
var AdminDashboard = require("../models/adminDashboard");

var User = require("../models/User");
var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  res.render('register');
};





// Admin adding movie datails
userController.adminDetails = function(req, res) {
    var admindashboard = new AdminDashboard({ 
        moviename : req.body.moviename, 
      })
        // .then(() => {
        //     return res.redirect('/user');
        // })
        admindashboard.save(function(err) {
            if(err) {
                return res.status(500).json({ status: false, message: 'Database error'})
            } else {
                 console.log("admindashboard =================>>>>>>>>>>>>>>>>>")
                // console.log(actionObj)
                return res.status(200).json({ status: true, message: 'inserted', data:admindashboard })
                res.send("Name saved to database");
            }
        })
    };





// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ 
      username : req.body.username, 
      name: req.body.name,
    }), 
    req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }
    passport.authenticate('local')(req, res, function () {
      res.redirect('/user');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res,) {
  passport.authenticate('local')(req, res, function () {
    

    User.findOne({ "username": req.body.username })
    .exec(function(err, user) {
        if (err)
        return res.status(400).json({ status: true, data: "", message: "Error in Login" });

      if (!user)
        return res.status(400).json({ status: true, data: "", message: "Invalid Email/Password" });


if(user.admin !== 'true') {
console.log("NOt admin", user.admin, user['username'])
res.redirect('/user');
}
else if (user.admin === 'true') {
console.log("admin----------------------->")
res.redirect('/admin');
}
    });
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};



// admin Dashboard
userController.adminDashboard = function(req, res) {
    res.render('admin', { user : req.user });
  };



// user Dashboard
userController.userDashboard = function(req, res) {
    res.render('user', { user : req.user });
  };



// User Home page
userController.homepage = function(req, res) {
    // User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    //   if (err) {
    //     return res.render('register', { user : user });
    //   }
    res.render('home', { user : req.user });
  
    //   passport.authenticate('local')(req, res, function () {
    //     res.redirect('/home');
    //   });
    // });
  };















module.exports = userController;