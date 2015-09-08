require('dotenv').load();

var http = require('http');
var path = require('path');
var logger = require('morgan');
var express = require('express');
var methodOverride = require('method-override');
var Resource = require('express-resource');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var jwt = require('jsonwebtoken');

var app = express(),
	home = express(),
	homeApi = express(),
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
 * Admin application
 *
 */
function checkAuth(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		return next();
	} else {
		res.redirect('/admin');
	}
}

admin.use('/api/v1', api);
admin.set('views', path.join(__dirname, 'views', 'admin'));
admin.get('/partials/:controller/:action?', angular.partials);
admin.get('*', angular.admin);

/**
 *
 * Api config
 *
 */


api.use(bodyParser.json({
	type: '*/json',
	strict: true
}));

api.use(bodyParser.urlencoded({
	extended: true
}));

//api.all('/tag*', checkAuth, require('./routes/tag'));

api.use('/auth', require('./routes/auth'));

api.use('/tag', checkAuth, require('./routes/tag'));
api.use('/post', checkAuth, require('./routes/post'));
api.use('/comment', checkAuth, require('./routes/comment'));
api.use('/profile', checkAuth, require('./routes/profile'));
api.use('/category', checkAuth, require('./routes/category'));

//api.resource('post', require('./resources/api/post'));

api.use('/upload', function(req, res, next) {
	req.accepts('image/*');
	next();
}, require('./routes/upload'));


/**
 *
 * Home application
 *
 */


home.use('/api/v1', homeApi);
home.set('views', path.join(__dirname, 'views', 'home'));
home.set('view engine', 'jade');
home.use(logger('dev'));
home.use(cookieParser());
home.use(methodOverride());
//home.use(express.static(path.join(__dirname, 'public/home')));
home.use('/assets', express.static(path.join(__dirname, 'public')));
home.use(express.static(path.join(__dirname, 'public')));
home.get('/home/partials/:controller/:action?', angular.partials);
home.get('*', angular.home);

homeApi.use(bodyParser.json({
	type: 'application/*'
}));

homeApi.use(bodyParser.urlencoded({
	extended: true
}));

homeApi.use('/auth', require('./routes/home/auth'));
homeApi.use('/author', require('./routes/home/author'));
homeApi.use('/category', require('./routes/home/category'));
homeApi.use('/post', require('./routes/home/post'));
homeApi.use('/tag', require('./routes/home/tag'));

home.listen(8080, function(req, res) {
	console.log('Home listening at http://localhost:%s', 8080);
});

app.listen(port, function(req, res) {
	console.log('App listening at http://localhost:%s', port);
});