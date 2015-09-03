var http = require("http"),
	path = require('path'),
	logger = require('morgan'),
	express = require('express'),
	methodOverride = require('method-override'),
	Resource = require('express-resource'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser');


var app = express(),
	admin = express(),
	api = express();

var partials = require('./routes/partials');

app.use('/admin', admin);
admin.use('/api/v1', api);

app.use(cookieParser());


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(methodOverride());
//app.use('/assets', express.static(path.join(__dirname, 'public')));

admin.set('views', path.join(__dirname, 'views', 'admin'));
app.use(express.static(path.join(__dirname, 'public')));

api.use(bodyParser.urlencoded({
	'extended': 'true'
}));

api.use(bodyParser.json({
	type: 'application/vnd.api+json'
}));


//admin.get('/', partials.index);


//Admin route
admin.get('/partials/:controller/:action?', partials.partials);


// Api route
api.resource('tag', require('./resources/api/tag'));

admin.get('*', partials.index);
//app.get('*', partials.index);

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});