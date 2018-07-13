var mongoose = require("mongoose");
var passport = require("passport");
var AdminDashboard = require("../models/adminDashboard");

var User = require("../models/User");
var userController = {};

// Restrict access to root page
userController.home = function(req, res) {
  AdminDashboard.findOne({ _id: "5b46dcb0f1210e1c0f7663c0"},{moviename:1})
      .exec(function(err, actions) {
          if(err) {
              return res.status(500).json({ status: false, message: 'Database error'})
          } else {
            return res.render('index', { 
              user : req.user,
              moviename : actions
            })
          }
      })
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
res.redirect('/home');
}
else if (user.admin === 'true') {
console.log("admin----------------------->")
res.redirect('/home');
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
    res.render('home', { user : req.user });
  };



// user Dashboard
userController.userDashboard = function(req, res) {
    res.render('user', { user : req.user });
  };


  userController.ticketbooking = function(req, res) {




    AdminDashboard.findOne({ _id: "5b482f4d1efa551a83141a10"},{moviename:1, originalname:1, date1:1, date2:1, firstShow:1, morningShow:1, noonShow:1, secondShow:1})
    .exec(function(err, actions) {
        if(err) {
            return res.status(500).json({ status: false, message: 'Database error'})
        } else {
          console.log(actions.date1.toDateString());

          return res.render('ticketbooking', { 
            user : req.user,
            moviename : actions,
            originalname : actions,
            date1 : actions,
            date2 : actions,
            firstShow : actions,
            morningShow : actions,
            noonShow : actions,
            secondShow : actions
          })
          // .status(200).json({ status: true, message: 'Actions fetched', data: actions})
        }
    })














    // res.render('ticketbooking', { user : req.user });
  };



// User Home page
userController.homepage = function(req, res) {

  AdminDashboard.findOne({ _id: "5b482f4d1efa551a83141a10"},{moviename:1, originalname:1})
  
      .exec(function(err, actions) {
          if(err) {
              return res.status(500).json({ status: false, message: 'Database error'})
          } else {
            return res.render('home', { 
              user : req.user,
              moviename : actions,
              originalname : actions
            })
            // .status(200).json({ status: true, message: 'Actions fetched', data: actions})
          }
      })
  };






module.exports = userController;