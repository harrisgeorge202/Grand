var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

var adminDashboardSchema = new Schema({
    moviename: String,
    path: { type: String, required: true, trim: true },
    originalname: { type: String, required: true }
    });

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);












// var imageSchema = mongoose.Schema({
//     path: {
//     type: String,
//     required: true,
//     trim: true
//     },
//     originalname: {
//     type: String,
//     required: true
//     }
    
//    });
    
    
//    var Image = module.exports = mongoose.model('files', imageSchema);