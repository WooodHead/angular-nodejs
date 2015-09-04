var models = require('../../models');

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
		slug: req.body.slug
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
		tag.slug = req.param('slug');
		tag.save().then(function(err, tag) {
			if (err) {
				res.status(403).json({
					errors: err
				});
			}
			res.status(200).json({
				message: 'Update success'
			});
		});
	});
};

exports.destroy = function(req, res) {
	models.Tag.findById(req.params.tag).then(function(tag) {
		tag.destroy().then(function(err, tag) {
			if (err) {
				res.status(403).json({
					errors: err
				});
			}
			// now i'm gone :)
			res.status(200).json({
				message: 'Destroy success'
			});
		});
	});
};