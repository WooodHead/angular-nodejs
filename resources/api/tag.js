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
	res.send('create forum');
};

exports.show = function(req, res) {
	console.log('edit forum ' + req.params.tag);
	models.Tag.findById(req.params.tag).then(function(tag) {
		res.json(tag);
	});
};

exports.edit = function(req, res) {
	res.send('edit forum ' + req.params.forum);
};

exports.update = function(req, res) {
	res.send('update forum ' + req.params.forum);
};

exports.destroy = function(req, res) {
	res.send('destroy forum ' + req.params.forum);
};