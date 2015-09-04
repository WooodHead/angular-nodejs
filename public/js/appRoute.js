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

		$httpProvider.useApplyAsync(true);

		$httpProvider.interceptors.push(function($q, $location, $localStorage) {
			return {
				request: function(config) {

					config.headers = config.headers || {};

					if ($localStorage.token) {
						config.headers.Authorization = 'Bearer ' + $localStorage.token;
					}
					return config;
				},
				response: function(res) {
					if (res.status === 401 || res.status === 403) {
						// Handle unauthenticated user.
						$location.path('/admin/auth/login');
					}
					return res || $q.when(res);
				}
			};
		});

	});