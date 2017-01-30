var mongoose = require('mongoose');
var Transaction = mongoose.model('transactions');
var Session = mongoose.model('session');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

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
    Transaction.find(function (err, transactions) {
        res.send(transactions);
    });
}

/* Activate SIM */
module.exports.activateSIM = function(req, res)
{
    console.log("ACTIVATING SIM");
    console.log(req.body);
    var profile = req.body.CSPSelect;
    var numbers = req.body.currentIMSIInput.split(",");
    numbers.forEach(function(number) {
        Sim.findOneAndUpdate({IMSI: number.trim()}, {state: "ACTIVE", service: profile}, function (err, res) {
            if (err) {
                console.log("ERROR WHILE ACTIVATING SIM: " + err);
                return;
            }
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}

/* Terminate SIM */
module.exports.terminateSIM = function(req, res)
{
    console.log("TERMINATING SIM");
    console.log(req.body);
    var numbers = req.body.currentIMSIInput.split(",");
    numbers.forEach(function(number) {
        Sim.findOneAndUpdate({IMSI: number.trim()}, {state: "TERMINATED"}, function (err, res) {
            if (err) {
                console.log("ERROR WHILE TERMINATING SIM: " + err);
                return
            }
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}

/* GET SIMS WITH PROFILES */
module.exports.getSIMsWithProfiles = function(req, res) {
    console.log("GETTING SIMS AND PROFILES");
    Sim.find()
        .populate('service') // multiple path names in one requires mongoose >= 3.6
        .exec(function(err, simsWithProfiles) {
            // handle err
            res.send(simsWithProfiles);
        });
}

/* Change Service Profile */
module.exports.changeProfile = function(req, res) {
    console.log("CHANGE PROFILE");
    var profile = req.body.CSPSelect;
    var numbers = req.body.currentIMSIInput.split(",");
    numbers.forEach(function(number) {
        Sim.findOneAndUpdate({IMSI: number.trim()}, {service: profile}, function (err, result) {
            if (err) {
                console.log("ERROR WHILE TERMINATING SIM: " + err);
                return;
            }
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}