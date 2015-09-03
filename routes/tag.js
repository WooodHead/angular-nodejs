var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
	res.render('tag/index', {
		title: 'DKMM'
	});
});

module.exports = router;