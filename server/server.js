var express = require("express");
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');
var cors = require('cors');

var bodyParser = require('body-parser');
var server = express();
var hostname = 'localhost';
var port = 3000;

server.use(cors());
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
require('../app/api/models/session');
require('../app/api/models/service_profile');
require('../app/api/models/transactions');
require('../app/api/models/triggers');

var routes = require('../app/api/routes/index');
server.use('/', routes);

// Import routes.js
//require('./routes')(server);
// Export module
exports = module.exports = server;