var express = require('express');
var router = express.Router();

router.get('/:controller/:action?', function(req, res) {
	if (typeof req.params.action === 'undefined') {
		req.params.action = 'index';
	}

	var allowedParams = ['controller', 'action'];
	var paramVals = [];
	for (var key in req.params) {
		if (allowedParams.indexOf(key) !== -1) {
			paramVals.push(req.params[key]);
		}
	}

	res.render('partials/' + paramVals.join('/'));
});

module.exports = router;