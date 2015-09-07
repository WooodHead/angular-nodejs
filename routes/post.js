var express = require('express');
var router = express.Router();
var models = require('../models');
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

	models.Post.findAndCountAll({
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
	models.Post.findOne({
		where: {
			id: req.params.post
		},
		include: [{
			as: 'categories',
			model: models.Category,
			required: false,
			attributes: ['id']
		}, {
			as: 'tags',
			model: models.Tag,
			required: false
		}]
	}).then(function(post) {

		res.json(post);
	});
});


router.patch('/:post', function(req, res) {
	models.Post.findById(req.params.post).then(function(post) {
		post.name = req.body.name;
		post.slug = slugify(req.body.name, {
			lower: true
		});
		post.content = req.body.content;
		post.description = req.body.description;

		post.save().then(function(post) {
			post.setCategories(req.body.categories);
			post.setTags(req.body.tags);
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