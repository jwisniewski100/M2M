var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var countersSchema = new Schema({
    _id: String,
    seq: Number,
});

mongoose.model('counters', countersSchema);