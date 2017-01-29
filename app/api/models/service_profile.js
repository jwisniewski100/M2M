var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var service_profileSchema = new Schema({
    id: Number,
    name: String,
    data_limit: Number,
    sms_limit: Number,
    lte_enable: Boolean,
});

service_profileSchema.plugin(autoIncrement.plugin, {
    model: 'service_profile',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

mongoose.model('service_profile', service_profileSchema);