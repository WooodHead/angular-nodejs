var express = require('express');
var router = express.Router();
var models = require('../../models');
var slugify = require('slug');

var colors = require('colors/safe');
colors.setTheme({
	silly: 'rainbow',
	input: 'grey',
	verbose: 'cyan',
	prompt: 'grey',
	info: 'green',
	data: 'grey',
	help: 'cyan',
	warn: 'yellow',
	debug: 'blue',
	error: 'red'
});

router.get('/', function(req, res) {

	models.Post.scope('isActive').findAndCountAll({
		order: 'id DESC',
		limit: 15,
		include: [{
			as: 'user',
			model: models.User,
			required: true
		}, {
			as: 'categories',
			model: models.Category,
			required: false
		}, {
			as: 'tags',
			model: models.Tag,
			required: false
		}]
	}).then(function(result) {

		res.json({
			data: result.rows,
			totalItems: result.count
		});
	});
});

router.get('/:post', function(req, res) {
	models.Post.scope('isActive').findOne({
		where: {
			id: req.params.post
		},
		include: [{
			as: 'user',
			model: models.User,
			required: true
		}, {
			as: 'categories',
			model: models.Category,
			required: false
		}, {
			as: 'tags',
			model: models.Tag,
			required: false
		}, {
			as: 'comments',
			model: models.Comment,
			required: false
		}]
	}).then(function(post) {
		if (post == null)
			res.type('application/json').json('Empty');
		else
			res.json(post);
	});
});

/**
 *
 * List comment by post
 *
 */

router.get('/:post/comment', function(req, res) {
	models.Post.scope('isActive').findOne({
		where: {
			id: req.params.post
		}
	}).then(function(post) {
		if (post == null) {
			res.type('application/json').json('Empty');
		} else {
			post.getComments({
				include: [{
					as: 'user',
					model: models.User,
					required: false
				}]
			}).then(function(comments) {
				if (comments != null) {
					res.json({
						data: comments
					});
				} else {
					res.send(null);
				}

			});
		}
	});
});

/**
 *
 * Send comment
 *
 */


router.post('/:post/comment', function(req, res, next) {
	var bearerToken;
	var bearerHeader = req.headers.authorization;
	if (typeof bearerHeader !== 'undefined') {
		var bearer = bearerHeader.split(" ");
		bearerToken = bearer[1];
		req.token = bearerToken;
		return next();
	} else {
		res.redirect('/auth/login');
	}
}, function(req, res) {

	models.User.findOne({
		where: {
			token: req.token
		}
	}).then(function(user) {

		if (user != null) {
			models.Post.findById(req.params.post).then(function(post) {
				var data = {
					content: req.body.comment,
					user_id: user.id,
					post_id: post.id
				};
				models.Comment.create(data).then(function(comment) {
					comment.dataValues.user = user;
					res.json(comment);

				});
			});
		}

	});

});

module.exports = router;