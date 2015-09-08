var express = require('express');
var router = express.Router();
var models = require('../../models');
var slugify = require('slug');

router.get('/all', function(req, res) {
	models.Category.findAll().then(function(cat) {
		res.json(cat);
	});
});

router.get('/:slug', function(req, res) {
	models.Category.findOne({
		where: {
			slug: req.params.slug
		}
	}).then(function(cat) {
		cat.getPosts({
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
		}).then(function(posts) {
			res.json({
				cat: cat,
				posts: {
					data: posts
				}
			});
		});
	});
});

module.exports = router;