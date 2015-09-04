var models = require('../../models');
var slugify = require('slug');

exports.index = function(req, res) {
	models.Tag.findAll({
		limit: 5
	}).then(function(tags) {
		res.json(tags);
	});
};

exports.new = function(req, res) {
	res.send('new forum');
};

exports.create = function(req, res) {
	var tag = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true
		})
	};
	models.Tag.create(tag).then(function(success) {
		res.json(success);
	});
};

exports.show = function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		res.json(tag);
	});
};

exports.edit = function(req, res) {

};

exports.update = function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.name = req.param('name');
		tag.slug = slugify(req.param('name'), {
			lower: true
		});
		tag.save().then(function(tag) {
			res.status(200).json({
				message: 'Update success'
			});
		});
	});
};

exports.destroy = function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.destroy().then(function(tag) {
			// now i'm gone :)
			res.status(200).json({
				message: 'Destroy success'
			});
		});
	});
};