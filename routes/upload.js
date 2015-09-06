Date.prototype.yyyymmdd = function() {

	var yyyy = this.getFullYear().toString();
	var mm = (this.getMonth() + 1).toString(); // getMonth() is zero-based         
	var dd = this.getDate().toString();

	return yyyy + '/' + (mm[1] ? mm : "0" + mm[0]) + '/' + (dd[1] ? dd : "0" + dd[0]);
};

var fs = require('fs');
var mkdirp = require('mkdirp');
var multer = require('multer');
var path = require('path');
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var models = require('../models');
var now = new Date();
var base_upload_path = 'uploads/avatar/' + now.yyyymmdd();
var upload_path = 'public/' + base_upload_path;

mkdirp(upload_path, function(err) {
	if (err)
		console.error(err)
	else console.log('pow!')
});

var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, upload_path)
	},

	filename: function(req, file, cb) {
		cb(null, Date.now() + '.jpg')
	},
	mimetype: 'image/jpeg'
});


var upload = multer({
	storage: storage,
	//dest: upload_path,	
	limits: {
		fileSize: 3115008
	}
}).single('file');


router.post('/', upload,
	function(req, res, next) {
		var bearerToken;
		var bearerHeader = req.headers.authorization;
		if (typeof bearerHeader !== 'undefined') {
			var bearer = bearerHeader.split(" ");
			bearerToken = bearer[1];
			req.token = bearerToken;
			next();
		} else {
			res.send(403);
		}
	},
	function(req, res) {

		models.User.findOne({
			where: {
				token: req.token
			}
		}).then(function(user) {
			if (fs.existsSync('public' + user.image)) {
				console.log('remove file');
				fs.unlinkSync('public' + user.image);
			};

			user.image = '/' + base_upload_path + '/' + req.file.filename;

			user.save().then(function(user1) {
				res.json(user1);
			});
			console.log(req.file);
		});
	});

module.exports = router;