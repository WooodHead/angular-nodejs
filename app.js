var http = require("http"),
	path = require('path'),
	logger = require('morgan'),
	express = require('express'),
	cookieParser = require('cookie-parser');

app = express();
app.use(cookieParser());

var tag = require('./routes/tag'),
	post = require('./routes/post');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('layout', {
		title: 'Hey',
		message: 'Hello there!'
	});
});

app.use('tag', tag);


var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});