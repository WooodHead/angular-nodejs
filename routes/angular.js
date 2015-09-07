var models = require('../models');

exports.partials = function(req, res) {
	if (typeof req.params.action === 'undefined') {
		req.params.action = 'index';
	}
	var allowedParams = ['controller', 'action'];
	var paramVals = [];
	for (var key in req.params) {
		if (allowedParams.indexOf(key) !== -1) {
			paramVals.push(req.params[key]);
		}
	}

	res.render('partials/' + paramVals.join('/'));
};

exports.admin = function(req, res, next) {
	res.render('layout');
	next();
};

exports.home = function(req, res, next) {
	res.render('layout');
	next();
};

exports.me = function(req, res) {
	models.User.findOne({
		token: req.token
	}, function(err, user) {
		if (err) {
			res.json({
				type: false,
				data: "Error occured: " + err
			});
		} else {
			res.json({
				type: true,
				data: user
			});
		}
	});
};