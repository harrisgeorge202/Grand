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
 







   


router.addImage = function(image, callback) {
    AdminDashboard.create(image, callback);
}
// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'uploads/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
 
var upload = multer({
 storage: storage
});




    
router.post('/adminDashboard', upload.any(), function(req, res, next) {
    console.log("req.files", req.body.moviename)

    // var admindashboard = new AdminDashboard({ 
    //     moviename : req.body.moviename, 
    //     storage: upload
    //     })



 res.send(req.files);
/*req.files has the information regarding the file you are uploading...
from the total information, i am just using the path and the imageName to store in the mongo collection(table)
*/
 var path = req.files[0].path;
 var imageName = req.files[0].originalname;
 var body = req.body.moviename

 var imagepath = {};
 imagepath['path'] = path;
 imagepath['originalname'] = imageName;
 imagepath['moviename'] = body;
 
 
 //imagepath contains two objects, path and the imageName
 console.log("imagepath---------->", imagepath)
 
 //we are passing two objects in the addImage method.. which is defined above..
 router.addImage(imagepath, function(err) {
 if(err) {
     console.log(err)
 }
 });
});


















//homepage after login
router.get('/home', auth.homepage);


//admin Dashboard
router.post('/adminDashboard', auth.adminDetails);


// route for user dashboard
router.get('/user', auth.userDashboard);

// route for admin dashboard
// router.get('/admin', auth.adminDashboard);

// route for logout action
router.get('/logout', auth.logout);

module.exports = router;