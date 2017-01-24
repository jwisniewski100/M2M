'use strict';
/**
 * Module dependencies.
 */

var express = require('express'),
	routes = require('./routes'),
	user = require('./routes/user'),
	http = require('http'),
	path = require('path'),
	RedisStore = require('connect-redis')(express),
	mongoose = require('mongoose'),
	fs = require('fs'),
	less = require('less-middleware');

var app = express();

mongoose.connect('mongodb://localhost/ft-1');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.on('open', function () {
	console.log('DB Opened');
});

var modelsPath = path.join(__dirname, 'models');
fs.readdirSync(modelsPath).forEach(function (modelFile) {
	if (~modelFile.indexOf('.js')) {
		require(path.join(modelsPath, modelFile));
	}
});

// all environments
app.use(less({
	dest: path.join(__dirname, 'app', 'public', 'styles'),
	src: path.join(__dirname, 'app', 'less'),
	prefix: '/styles',
	paths: [path.join(__dirname, 'app/less/lib/**/*.less')],
	compress: true
}));

app.use(express.static(path.join(__dirname, 'app', 'public')));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({store: new RedisStore({host: 'localhost', port: 6379}),  secret: 'supersecretsauce'}));
app.use(express.methodOverride());
app.use(app.router);


// development only
if ('development' === app.get('env')) {
	app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

var server = http.createServer(app);

exports = module.exports = server;

exports.use = function () {
	app.use.apply(app, arguments);
};