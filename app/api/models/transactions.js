var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var Schema = mongoose.Schema;

var transactionsSchema = new Schema({
    id: Number,
    imsi: Number,
    msisdn: Number,
    start_date: Date,
    end_date: Date,
    state: String,
    created_by: String,
    type: String,
});

transactionsSchema.plugin(autoIncrement.plugin, {
    model: 'transactions',
    field: 'id',
    startAt: 0,
    incrementBy: 1
});

mongoose.model('transactions', transactionsSchema);
