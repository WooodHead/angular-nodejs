require('dotenv').load();
var http = require("http"),
	path = require('path'),
	logger = require('morgan'),
	express = require('express'),
	methodOverride = require('method-override'),
	Resource = require('express-resource'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	multer = require('multer'),
	jwt = require('jsonwebtoken');

var app = express(),
	admin = express(),
	api = express();

var port = process.env.PORT || 8080;

var angular = require('./routes/angular');

/**
 *
 * App config
 *
 */

app.set('superSecret', process.env.APP_KEY);
app.use('/admin', admin);
app.use(cookieParser());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

/**
 *
 * Admin config
 *
 */


admin.use('/api/v1', api);
admin.set('views', path.join(__dirname, 'views', 'admin'));
//admin.get('/partials', require('./routes/partials'));
admin.get('/partials/:controller/:action?', angular.partials);
admin.get('*', angular.index);

/**
 *
 * Api config
 *
 */


api.use(bodyParser.json({
	type: 'application/*'
}));

api.use(bodyParser.raw({
	type: 'application/*'
}));

api.use(bodyParser.urlencoded({
	extended: true
}));

api.use('/auth', require('./routes/auth'));

api.resource('tag', require('./resources/api/tag'));

api.resource('category', require('./resources/api/category'));

api.resource('post', require('./resources/api/post'));

/*
api.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

*/


var server = app.listen(port, function(req, res) {

	console.log('Example app listening at http://localhost:%s', port);
});