var mongoose = require('mongoose');
var Transaction = mongoose.model('transactions');
var Session = mongoose.model('session');

/* Add new transaction */
module.exports.addTransaction = function(req, res)
{
    Session.findOne({_id: 0}, function (err, session) {
        console.log("ADDING NEW TRANSACTION");
        console.log(req.body);
        var type = req.transaction_type;
        var imsi = req.imsi;

        var transaction = new Transaction({
            start_date: Date.now(),
            end_date: getEndDate(Date.now()),
            state: "Finished",
            type: type,
            imsi: imsi,
            created_by: session.currentUserId
        });

        transaction.save(function (err, sim) {
            if (err)
                return console.error(err);
        });
        /*res.contentType('json');
         res.redirect('http://localhost:9000/#/index/transactions');
         res.send();*/
    });
}

function getEndDate(date) {
    var rateMin = 20;
    var rateMax = 700;
    return date + (Math.floor(Math.random() * (rateMax - rateMin + 1)) + rateMin);
}

/* Get all transactions */
module.exports.getAllTransactions = function(req, res) {
    console.log("GETTING ALL TRANSACTIONS");
    Session.findOne({_id: 0}, function (err, session) {
        Transaction.find({created_by: session.currentUserId}, function (err, transactions) {
            res.send(transactions);
        });
    });
}

