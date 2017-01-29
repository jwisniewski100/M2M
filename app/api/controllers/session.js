var mongoose = require('mongoose');
var Session = mongoose.model('session');
var util = require('util')

module.exports.setCurrentUser = function(req, res) {
    console.log("SETTING CURRENT USER");
    Session.findOneAndUpdate({_id: 0}, {currentUserId: req.currentUserId}, { upsert: true, new: true, setDefaultsOnInsert: true }, function (err, result) {
        if (err) {
            console.log("ERROR WHILE SETTING CURRENT SESSION: " + err);
            return;
        }
    });
}

module.exports.getCurrentUser = function(req, res)
{
    console.log("GETTING CURRENT USER");
    Session.findOne({_id: 0}, function (err, session) {
        console.log(session);
        if (err)
            console.log("ERROR WHILE GETTING CURRENT SESSION");
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(session));
        res.end();
    });
}
