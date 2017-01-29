var mongoose = require('mongoose');
var User = mongoose.model('users');
var session = require('./session.js');
var util = require('util')

/*var sendJSONresponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.getAllUsers = function (req, res) {
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

company_name: String,
    country: String,
    city: String,
    street: String,
    email: String,
    password: String
*/
module.exports.addUser = function(req, res)
{
    console.log("ADDING NEW USER");
    console.log(req.body);
    var user = new User({
        company_name: req.body.company_name,
        country: req.body.country,
        city: req.body.city,
        street: req.body.street,
        email: req.body.email,
        password: req.body.password,
    });
    user.save(function (err, user) {
        if (err)
            return console.error(err);
    });
}

module.exports.getByUserName = function(req, res)
{
    console.log("GETTING USER BY NAME");
    //console.log(res.body);
    User.findOne({company_name: req.body.company_name}, function(err, user) {
        if (err) {
            return err;
        }
        console.log("user:" + user.password);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(user));
        res.end();
    });

}

module.exports.login = function(req, res)
{
    console.log("CHECK PASSWORD");
    console.log(req.body.username);

    User.findOne({company_name: req.body.username}, function(err, user) {
        if (err) {
            return err;
        }
        console.log("user:" + user);
        if(user == undefined)
            return res.redirect('http://localhost:9000/#/login/minor');
        if(user.password == req.body.password)
        {
            console.log('Correct password.');
            session.setCurrentUser({ currentUserId :user.company_name})
            return res.redirect('http://localhost:9000/#/index/dashboard');
        }
        else
            return res.redirect('http://localhost:9000/#/login/minor');

    });
}

module.exports.logout = function(req, res)
{
            return res.redirect('http://localhost:9000/#/login/minor');
}