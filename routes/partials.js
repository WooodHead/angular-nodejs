exports.partials = function(req, res) {
	console.log(req.params);
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

	//console.log('partials/' + paramVals.join('/'));

	//res.render('partials/' + req.params.name);
	res.render('partials/' + paramVals.join('/'));
};

exports.index = function(req, res, next) {
	console.log('dkm');
	res.render('layout');
	next();
};