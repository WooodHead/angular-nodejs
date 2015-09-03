var http = require("http"),
	path = require('path'),
	express = require('express'),
	Sequelize = require('sequelize'),
	cookieParser = require('cookie-parser');

app = express();
app.use(cookieParser());

var sequelize = new Sequelize('learn_node', 'nopbongdem', 'thedollar', {
	host: 'localhost',
	dialect: 'mysql',

	pool: {
		max: 5,
		min: 0,
		idle: 10000
	}
});

var tag = require('./routes/tag'),
	post = require('./routes/post');


var Tag = sequelize.import(__dirname + "/models/tag");

var server = app.listen(3000, function() {
	var host = server.address().address;
	var port = server.address().port;

	console.log('Example app listening at http://%s:%s', host, port);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
	res.render('layout', {
		title: 'Hey',
		message: 'Hello there!'
	});
});

app.use('/tag', tag);