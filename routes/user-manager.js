var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function(req, res) {
	models.User.findAll({
		order: 'name DESC'
	}).then(function(users) {

		res.json(users);
	});
});

router.get('/:id', function(req, res) {
	models.User.findById(req.params.id).then(function(user) {
		res.json(user);
	});
});

router.post('/', function(req, res) {
	var data = {
		name: req.body.name,
		email: req.body.email,
		image: '/image/no-image.png',
		password: req.body.password
	};


	models.User.create(data).then(function(user) {
		res.json({
			message: 'Create new user ' + user.name
		});
	});
});

router.delete('/:id', function(req, res) {
	models.User.findById(req.params.id).then(function(user) {
		user.destroy().then(function() {
			// now i'm gone :)
			res.status(200).json({
				message: 'Destroy success'
			});
		});
	});
});

module.exports = router;