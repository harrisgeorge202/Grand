var express = require('express');
var router = express.Router();
var auth = require("../controllers/AuthController.js");
var AdminDashboard = require("../models/adminDashboard");
var multer = require('multer');


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

// //homepage after login
// router.get('/home', auth.homepage);








//Initial router.get
router.get('/admin', function(req, res, next) {
    res.render('home', { user : req.user });
    // res.render('index.ejs');
   });
 

router.addImage = function(image, callback, req, res) {
// AdminDashboard.create(image, callback);
// console.log("image------------------->", image)
// console.log("callback------------------->", callback)
    AdminDashboard.findOneAndUpdate({_id: "5b482f4d1efa551a83141a10"}, 
        { $set: { 
            path: image.path ,
            originalname: image.originalname , 
            moviename: image.moviename, 
            date1: image.date1, 
            date2: image.date2,
            morningShow: image.morningShow,
            noonShow: image.noonShow,
            firstShow: image.firstShow,
            secondShow: image.secondShow,
        } 
    }, {new:true},
        function (err, rule) {
            if (err) {                
                return res.status(500).json(err)} 
            else {
                return res
            }
        })
}
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'public/images/uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});

var upload = multer({
 storage: storage
});

router.post('/adminDashboard', upload.any(), function(req, res, next) {

 res.redirect('/home');
/*req.files has the information regarding the file you are uploading...
from the total information, i am just using the path and the imageName to store in the mongo collection(table)
*/
 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 var movieName = req.body.moviename;
 var date_1 = req.body.date1;
 var date_2 = req.body.date2;
 var morningShow = req.body.morningShow;
 var noonShow = req.body.noonShow;
 var firstShow = req.body.firstShow;
 var secondShow = req.body.secondShow;
 



 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
 imagepath['moviename'] = movieName;
 imagepath['date1'] = date_1;
 imagepath['date2'] = date_2;
 imagepath['morningShow'] = morningShow;
 imagepath['noonShow'] = noonShow;
 imagepath['firstShow'] = firstShow;
 imagepath['secondShow'] = secondShow;
 
 

 
 //imagepath contains two objects, path and the imageName
 console.log("imagepath===================>", imagepath)
 //we are passing two objects in the addImage method.. which is defined above..
 router.addImage(imagepath, function(err) {
 if(err) {
     console.log(err)
 }
 });
});


//homepage after login
router.get('/home', auth.homepage);



//homepage after login
router.get('/ticketbooking', auth.ticketbooking);



//admin Dashboard
router.post('/adminDashboard', auth.adminDetails);


// route for user dashboard
router.get('/user', auth.userDashboard);

// route for admin dashboard
// router.get('/admin', auth.adminDashboard);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;