require('dotenv').load();
var express = require('express');
var validator = require('validator');
var router = express.Router();
var models = require('../models');
var jwt = require('jsonwebtoken');
var passwordHash = require('password-hash');

// Get info user
router.get('/me', function(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.send(403);
	}
}, function(req, res) {
	models.User.findOne({
		where: {
			token: req.token
		}
	}).then(function(user) {
		res.json(user);
	});
});

router.get('/logout', function(req, res) {

});
// POST method route
router.post('/login', function(req, res) {
	// find the user

	models.User.findOne({
		where: {
			email: req.body.email
		}
	}).then(function(user) {

		if (!user) {
			res.status(401).json({
				errors: {
					password: 'Authentication failed. User not found.'
				}
			});
		} else if (user) {
			// check if password matches
			if (passwordHash.verify(req.body.password, user.password)) {

				user.token = jwt.sign(user, process.env.APP_KEY);

				//user.token = jwt.sign(user, process.env.APP_KEY);
				user.save().then(function(user1) {
					res.json({
						data: user1,
						token: user1.token
					});
				});

			} else {
				res.status(401).json({
					errors: {
						password: 'Authentication failed. Wrong password.'
					}
				});

			}
		}
	}).catch(function(err) {
		throw err;
	});

});

router.post('/register', function(req, res) {

	if (!validator.isEmail(req.body.email)) {
		res.status(403).json({
			errors: {
				email: 'Email not valid'
			}
		});
	}

	if (!validator.isLength(req.body.password, 6)) {
		res.status(403).json({
			errors: {
				password: 'Password to short'
			}
		});
	}
	if (!validator.equals(req.body.password, req.body.password_confirmation)) {
		res.status(403).json({
			errors: {
				password: 'Password not match'
			}
		});
	}

	var data = {
		name: req.body.name,
		email: req.body.email,
		image: '/image/no-image.png',
		password: passwordHash.generate(req.body.password)
	};
	models.User.create(data).then(function(user) {

		//user.token = jwt.sign(user, process.env.APP_KEY);
		user.token = jwt.sign(user, process.env.APP_KEY, {
			expiresInMinutes: 1440 // expires in 24 hours
		});
		user.save().then(function(user1) {
			res.json({
				type: true,
				data: user1,
				token: user1.token
			});
		});
	});


});

module.exports = router;