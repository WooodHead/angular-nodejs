var express = require('express');
var router = express.Router();
var models = require('../../models');
var slugify = require('slug');

router.get('/:tag', function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.getPosts({
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
				tag: tag,
				posts: {
					data: posts
				}
			});
		});
	});
});


module.exports = router;