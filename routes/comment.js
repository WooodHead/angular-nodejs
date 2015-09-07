var express = require('express');
var router = express.Router();
var models = require('../models');


router.get('/', function(req, res) {

	models.Comment.findAndCountAll({
		limit: 15,
		include: [{
			as: 'user',
			model: models.User,
			required: false
		}, {
			as: 'post',
			model: models.Post,
			required: false
		}]
	}).then(function(result) {
		res.json({
			data: result.rows,
			totalItems: result.count
		});
	});
});


router.get('/:comment', function(req, res) {
	models.Comment.findOne({
		where: {
			id: req.params.comment
		}
	}).then(function(comment) {
		res.json(comment);
	});
});


router.put('/:comment', function(req, res) {
	models.Comment.findById(req.params.comment).then(function(comment) {
		comment.content = req.body.content;

		comment.save().then(function() {
			res.status(200).json({
				message: 'Update success'
			});
		});
	});
});

router.delete('/:comment', function(req, res) {
	models.Comment.findById(req.params.comment).then(function(comment) {
		comment.destroy().then(function() {
			// now i'm gone :)
			res.json({
				message: 'Destroy success'
			});
		});
	});
});

module.exports = router;