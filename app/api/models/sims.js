var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var simSchema = new Schema({
    checkbox_id: Number,
    IMSI: String,
    MSISDN: String,
    activated: Date,
    service: String,
    state: String,
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    }
});

simSchema.plugin(autoIncrement.plugin, {
    model: 'SIM',
    field: 'IMSI',
    startAt: 231000020000,
    incrementBy: 1
});

simSchema.plugin(autoIncrement.plugin, {
    model: 'SIM',
    field: 'MSISDN',
    startAt: 43003001000000,
    incrementBy: 1
});

simSchema.plugin(autoIncrement.plugin, {
    model: 'SIM',
    field: 'checkbox_id',
    startAt: 0,
    incrementBy: 1
});

var SIM = mongoose.model('sims', simSchema);