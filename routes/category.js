var express = require('express');
var router = express.Router();
var models = require('../models');
var slugify = require('slug');

router.get('/', function(req, res) {
	models.Category.findAll({
		order: 'id DESC',
		limit: 15
	}).then(function(cats) {

		res.json(cats);
	});
});

router.post('/', function(req, res) {
	var data = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true
		})
	};
	models.Category.create(data).then(function(success) {
		res.json({
			message: 'Add new category ' + success.name
		});
	});
});

router.get('/:cat', function(req, res) {
	models.Category.findById(req.params.cat).then(function(cat) {
		res.json(cat);
	});
});


router.patch('/:cat', function(req, res) {
	models.Category.findById(req.params.cat).then(function(cat) {
		cat.name = req.body.name;
		cat.slug = slugify(req.body.name, {
			lower: true
		});

		cat.save().then(function(cat) {
			res.status(200).json({
				message: 'Update category ' + cat.name
			});
		});
	});
});

router.delete('/:cat', function(req, res) {
	models.Category.findById(req.params.cat).then(function(cat) {
		cat.destroy().then(function() {
			// now i'm gone :)
			res.status(200).json({
				message: 'Destroy success'
			});
		});
	});
});

module.exports = router;