var mongoose = require('mongoose');
var Profile = mongoose.model('service_profile');
var util = require('util')

module.exports.addNewProfile = function(req, res) {
    console.log("ADDING NEW PROFILE");
    var profile = new Profile({
        _id: req.body.spName,
        data_limit: req.body.spDataLimit,
        sms_limit: req.body.spSMSLimit,
        lte_enable: req.body.spLTE,
    });
    profile.save(function (err, profile) {
        if (err)
            return console.error(err);
    });
    res.contentType('json');
    res.redirect('http://localhost:9000/#/index/overview');
    res.send();
}

module.exports.getAllProfiles = function(req, res) {
    console.log("GETTING ALL PROFILES");
    Profile.find(function (err, profile) {
        res.send(profile);
    });
}

