var express = require("express");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var bodyParser = require('body-parser');
//var fs = require('fs');







//require('../app/api/config/passport');

//var routesApi = require('../app/api/routes/index');

var server = express();
var hostname = 'localhost';
var port = 3000;

//var users = require('./routes/users');
//var users = require('../app/api/routes/users');
//var sims = require('../app/api/routes/sims');



//server.use('/api', routesApi);

server.use(express.static(__dirname + '/../client'));
server.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
server.use(bodyParser.json());
server.listen(port, hostname);
console.log("Server: Express listening: http://" + hostname + ":" + port);

//mongoose connect
var connection = mongoose.connect('mongodb://localhost/m2m', function(err) {
    if(err) {
        console.log('connection error', err);
    } else {
        console.log('Database: MongoDB connection successful');
    }
});
autoIncrement.initialize(connection);

//MODELS
require('../app/api/models/users');
require('../app/api/models/sims');

var routes = require('../app/api/routes/index');
server.use('/', routes);

/*server.get('/users', function(req, res){
    mongoose.model('users').find(function(err, users){
        res.send(users);
    });
});*/

server.get('/sims', function(req, res){
    mongoose.model('sims').find(function(err, sims){
        res.send(sims);
    });
});

// Import routes.js
//require('./routes')(server);
// Export module
exports = module.exports = server;