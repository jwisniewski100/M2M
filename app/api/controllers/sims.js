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
    var sim = new Sim({
        /*IMSI: getNextSequence('IMSI'),
        MSISDN: getNextSequence('MSISDN'),*/
        activated: Date.now(),
        service: req.body.sim_type,
        state: "Active",
    });
    sim.save(function (err, sim) {
        if (err)
            return console.error(err);
    });
}



/* Get all SIMs */
/*module.exports.getAllSIMs = function(req, res) {
    console.log("Getting all SIMs");
    var simList = Sim.find({});
    console.log(simList)
};*/

/*var buildLocationList = function(req, res, results, stats) {
    var locations = [];
    results.forEach(function(doc) {
        locations.push({
            distance: theEarth.getDistanceFromRads(doc.dis),
            name: doc.obj.name,
            address: doc.obj.address,
            rating: doc.obj.rating,
            facilities: doc.obj.facilities,
            _id: doc.obj._id
        });
    });
    return locations;
};*/
/*module.exports.getAllUsers = function (req, res) {
    mongoose.model('users').find(function(err, users){
        res.send(users);
    });
}
server.get('/users', function(req, res){

});

server.get('/sims', function(req, res){
    mongoose.model('sims').find(function(err, sims){
        res.send(sims);
    });
});

server.post('/insert', function(req, res, next){
    console.log('DUPPAAAAAAAAAAAAAAAAAA!!!!!!!!!!!!!!!!!!!!!');
    var user = new User({
        email : req.body.email,
        company_name : req.body.company_name,
    });
    user.save(function (err) {
        if (err) {
            return err;
        }
        else {
            console.log("User added");
        }
    });
});*/