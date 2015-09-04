var models = require('../../models');
var slugify = require('slug');
exports.index = function(req, res) {
	models.Category.findAll({
		limit: 5
	}).then(function(data) {
		res.json(data);
	});
};

exports.new = function(req, res) {
	res.send('new forum');
};

exports.create = function(req, res) {
	var data = {
		name: req.body.name,
		slug: slugify(req.body.name, {
			lower: true
		})
	};
	models.Category.create(data).then(function(success) {
		res.json({
			message: 'Create new category ' + success.name
		});
	});
};

exports.show = function(req, res) {
	models.Category.findById(req.params.category).then(function(data) {
		res.json(data);
	});
};

exports.edit = function(req, res) {

};

exports.update = function(req, res) {
	models.Category.findById(req.params.category).then(function(category) {
		category.name = req.param('name');
		category.slug = slugify(req.param('name'), {
			lower: true
		});
		category.save().then(function(err, category) {
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
	models.Category.findById(req.params.category).then(function(item) {
		item.destroy().then(function(err, category) {
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