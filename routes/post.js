var express = require('express');
var router = express.Router();
var models = require('../models');
var slugify = require('slug');
var Sequelize = require('sequelize');

router.get('/', function(req, res) {

	models.Post.findAll({
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
	}).then(function(posts) {
		res.json({
			data: posts
		});
	});
});

router.post('/', function(req, res) {

	models.User.findOne({
		where: {
			token: req.token
		}
	}).then(function(user) {

		var data = {
			name: req.body.name,
			slug: slugify(req.body.name, {
				lower: true
			}),
			content: req.body.content,
			description: req.body.description,
			user_id: user.id
		};
		models.Post.create(data).then(function(post) {
			post.addCategories(req.body.categories);
			post.addTags(req.body.tags);
			res.json({
				message: 'Create new ' + post.name
			});
		});
	});

});

router.get('/:post', function(req, res) {
	models.Post.findById(req.params.post).then(function(post) {
		res.json(post);
	});
});


router.put('/:post', function(req, res) {
	models.Post.findById(req.params.post).then(function(post) {
		post.name = req.param('name');
		post.slug = slugify(req.param('name'), {
			lower: true
		});
		post.save().then(function(post) {
			res.status(200).json({
				message: 'Update success'
			});
		});
	});
});

router.delete('/:post', function(req, res) {
	models.Post.findById(req.params.post).then(function(post) {
		post.destroy().then(function(post) {
			// now i'm gone :)
			res.json({
				message: 'Destroy success'
			});
		});
	});
});

module.exports = router;