var mongoose = require('mongoose');
var Trigger = mongoose.model('triggers');
var Session = mongoose.model('session');
var Sim = mongoose.model('sims');
var transactions = require('./transactions.js');

/* Add new trigger */
module.exports.addTrigger = function(req, res) {
    Session.findOne({_id: 0}, function (err, session) {
        console.log("GETTING ALL SIM CARDS OF CURRENT USER");
        Sim.find({userid: session.currentUserId}, function (err, sims) {
            console.log("SIMS: " + sims);
            console.log("Number of sims: " + Object.keys(sims).length);
            console.log("ADDING NEW TRIGGER");
            console.log(req.body);
            var type = req.body.items2 == 'sms' ? 'Send SMS' : 'Change SP'
            var trigger = new Trigger({
                name: req.body.trigger_name,
                type: type,
                creation_date: Date.now(),
                sim_count: Object.keys(sims).length,
                state: "INACTIVE",
                owner: session.currentUserId
            });
            trigger.save(function (err, trigger) {
                if (err)
                    return console.error(err);
                transactions.addTransaction({transaction_type: "Trigger Created", imsi: trigger.id});
            });
            /*Trigger.findOne(function (err, trigger) {

            });*/

            res.contentType('json');
            res.redirect('http://localhost:9000/#/index/triggers');
            res.send();
        });
    });
}


/* Get all triggers */
module.exports.getAllTriggers = function(req, res) {
    Session.findOne({_id: 0}, function (err, session) {
        console.log("GETTING ALL TRIGGERS");
        Trigger.find({owner: session.currentUserId}, function (err, trigger) {
            res.send(trigger);
        });
    });
}

/* Deactivate Trigger */
module.exports.deactivateTrigger = function(req, res)
{
    console.log("DEACTIVATING TRIGGER");
    console.log(req.body);
    var numbers = req.body.currentIMSIInput.split(",");
    numbers.forEach(function(number) {
        Trigger.findOneAndUpdate({id: number.trim()}, {state: "DEACTIVATED"}, function (err, result) {
            if (err) {
                console.log("ERROR WHILE DEACTIVATING TRIGGER: " + err);
                return
            }
            if(number.trim() != "")
                transactions.addTransaction({ transaction_type: "Deactivate Trigger", imsi: number.trim()});
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/triggers');
    res.send();
}

/* Activate Trigger */
module.exports.activateTrigger = function(req, res)
{
    console.log("ACTIVATING TRIGGER");
    console.log(req.body);
    var numbers = req.body.currentIMSIInput.split(",");
    numbers.forEach(function(number) {
        Trigger.findOneAndUpdate({id: number.trim()}, {state: "ACTIVE"}, function (err, result) {
            if (err) {
                console.log("ERROR WHILE ACTIVATING TRIGGER: " + err);
                return
            }
            if(number.trim() != "")
                transactions.addTransaction({ transaction_type: "Activate Trigger", imsi: number.trim()});
        });
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/triggers');
    res.send();
}
