var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var passportLocalMongoose = require('passport-local-mongoose');

var adminDashboardSchema = new Schema({
    moviename: String,
    });

// UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('AdminDashboard', adminDashboardSchema);