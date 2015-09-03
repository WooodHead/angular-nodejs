var models = require('../models');
var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res) {
	//models.Tag
	res.render('tag/index', {
		title: 'DKMM'
	});
});

router.post('/store', function(req, res) {

});

module.exports = router;