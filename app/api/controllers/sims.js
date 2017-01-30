var mongoose = require('mongoose');
var Sim = mongoose.model('sims');
var transactions = require('./transactions.js');

var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

/* Add new SIM */
module.exports.orderSIM = function(req, res)
{
    console.log("ADDING NEW SIM");
    console.log(req.body);
    for(i = 0; i < req.body.quantity; i++ ) {
        var sim = new Sim({
            activated: Date.now(),
            service: null,
            state: "INACTIVE",
        });
            sim.save(function (err, sim) {
                if (err)
                    return console.error(err);
            });
        Sim.findOne(function (err, sim) {
            transactions.addTransaction({ transaction_type: "SIM Order", imsi: sim.IMSI });
        });

    }
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}

/* Get all SIMs */
module.exports.getAllSIMs = function(req, res) {
    console.log("GETTING ALL SIM CARDS");
        Sim.find(function (err, sims) {
            res.send(sims);
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
        Sim.findOneAndUpdate({IMSI: number.trim()}, {state: "ACTIVE", service: profile}, function (err, result) {
            if (err) {
                console.log("ERROR WHILE ACTIVATING SIM: " + err);
                return;
            }
            if(number.trim() != "")
                transactions.addTransaction({ transaction_type: "Activate SIM", imsi: number.trim()});
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
        Sim.findOneAndUpdate({IMSI: number.trim()}, {state: "TERMINATED"}, function (err, result) {
            if (err) {
                console.log("ERROR WHILE TERMINATING SIM: " + err);
                return
            }
            if(number.trim() != "")
                transactions.addTransaction({ transaction_type: "Terminate SIM", imsi: number.trim()});
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
            if(number.trim() != "")
                transactions.addTransaction({ transaction_type: "SP Change", imsi: number.trim()});
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}