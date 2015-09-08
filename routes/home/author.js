var express = require('express');
var router = express.Router();
var models = require('../../models');
var slugify = require('slug');

router.get('/:user', function(req, res) {
	models.User.findById(req.params.user).then(function(user) {
		user.getPosts({
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
				user: user,
				posts: {
					data: posts
				}
			});
		});
	});
});


module.exports = router;