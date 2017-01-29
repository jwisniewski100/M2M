var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;
require('./sims.js')

var service_profileSchema = new Schema({
    _id: String,
    id: Number,
    //name: String,
    data_limit: Number,
    sms_limit: Number,
    lte_enable: Boolean,
    sim: [{ type: Schema.Types.ObjectId, ref: 'Sim' }]
});

service_profileSchema.plugin(autoIncrement.plugin, {
    model: 'service_profile',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

var ServiceProfile = mongoose.model('service_profile', service_profileSchema);