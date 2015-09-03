angular
	.module('appRoute', [])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/admin/:controller/:action?', {
				templateUrl: function(params) {
					if (typeof params.action === 'undefined') {
						params.action = 'index';
					}
					var allowedParams = ['controller', 'action'];
					var paramVals = [];
					for (var key in params) {
						if (allowedParams.indexOf(key) !== -1) {
							paramVals.push(params[key]);
						}
					}
					return '/admin/partials/' + paramVals.join('/');
				}
			})
			.when('/admin/:controller/:id/:action?', {
				templateUrl: function(params) {
					if (typeof params.action === 'undefined') {
						params.action = 'index';
					}
					var allowedParams = ['controller', 'action'];
					var paramVals = [];
					for (var key in params) {
						if (allowedParams.indexOf(key) !== -1) {
							paramVals.push(params[key]);
						}
					}
					return '/admin/partials/' + paramVals.join('/');
				}
			})
			.otherwise({
				redirectTo: '/admin'
			});


		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false,
			rewriteLinks: true
		});
	});