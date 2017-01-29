var mongoose = require('mongoose');
const crypto = require('crypto');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    company_name: { type: String, index: {unique: true }},
    country: String,
    city: String,
    street: String,
    email: String,
    password: String,
});

mongoose.model('users', userSchema);