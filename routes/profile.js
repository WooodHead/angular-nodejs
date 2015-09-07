var express = require('express');
var router = express.Router();
var models = require('../models');
var passwordHash = require('password-hash');
var validator = require('validator');
var bodyParser = require('body-parser');

router.patch('/', function(req, res) {

	models.User.findOne({
		where: {
			token: req.token
		}
	}).then(function(user) {
		user.name = req.body.name;

		if (validator.isNull(req.body.password) && validator.isLength(req.body.password, 6)) {
			user.password = passwordHash.generate(req.body.password);
		}

		user.save().then(function(user1) {
			res.json({
				message: 'Update success'
			});
		});

	});

});


module.exports = router;