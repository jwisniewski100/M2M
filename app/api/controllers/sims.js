var mongoose = require('mongoose');
var Sim = mongoose.model('sims');

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

/* GET NUMBER SIMS WITH SERVICE PROFILES */ 
module.exports.getNumberSIMsWithSP = function(req, res)
{
    console.log("GETTING NUMBER SIMS BY SERVICE PROFILE");
    Sim.aggregate([
    	{ $group: { 
    		_id: { service: '$service' },
    		count: { $sum: 1 }
    	}}, 
    	{$project: {  
    			_id: 0,
    			service: '$_id.service',
    	        count: 1
    	}}]
    	,function(err, result){
    		res.send(result);
            }
    ); 
//    res.contentType('json');
  //  res.redirect('http://localhost:9000/#/index/overview');
  //  res.send();
}