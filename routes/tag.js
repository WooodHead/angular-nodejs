var express = require('express');
var router = express.Router();
var models = require('../models');
var slugify = require('slug');

router.get('/', function(req, res) {
	models.Tag.findAll({
		order: 'id DESC',
		limit: 15
	}).then(function(tags) {

		res.json(tags);
	});
});

router.post('/', function(req, res) {
	var tag = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true
		})
	};
	models.Tag.create(tag).then(function(success) {
		res.json({
			message: 'Create new tag ' + success.name
		});
	});
});

router.get('/:tag', function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		res.json(tag);
	});
});


router.patch('/:tag', function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.name = req.body.name;
		tag.slug = slugify(req.body.name, {
			lower: true
		});

		tag.save().then(function(tag) {
			res.status(200).json({
				message: 'Update tag ' + tag.name
			});
		});
	});
});

router.delete('/:tag', function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.destroy().then(function(tag) {
			// now i'm gone :)
			res.status(200).json({
				message: 'Destroy success'
			});
		});
	});
});

module.exports = router;