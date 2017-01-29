var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var sessionSchema = new Schema({
    _id: String,
    currentUserId: String,
});

mongoose.model('session', sessionSchema);