var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var simSchema = new Schema({
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

mongoose.model('sims', simSchema);