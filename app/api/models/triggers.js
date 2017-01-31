var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var triggersSchema = new Schema({
    id: Number,
    name: String,
    type: String,
    creation_date: Date,
    sim_count : Number,
    state: String
});

triggersSchema.plugin(autoIncrement.plugin, {
    model: 'triggers',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

mongoose.model('triggers', triggersSchema);