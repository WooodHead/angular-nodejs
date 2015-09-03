angular
	.module('appRoute', [])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/:controller/:action?', {
				templateUrl: function(params) {
					var allowedParams = ['controller', 'action'];
					var paramVals = [];
					for (var key in params) {
						if (allowedParams.indexOf(key) !== -1) {
							paramVals.push(params[key]);
						}
					}
					return '/angular/' + paramVals.join('/');
				}
			})
			.when('/:controller/:id/:action?', {
				templateUrl: function(params) {
					var allowedParams = ['controller', 'action'];
					var paramVals = [];
					for (var key in params) {
						if (allowedParams.indexOf(key) !== -1) {
							paramVals.push(params[key]);
						}
					}
					return '/angular/' + paramVals.join('/');
				}
			})
			.otherwise({
				redirectTo: '/'
			});


		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false,
			rewriteLinks: true
		});
	});