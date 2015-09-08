angular
	.module('appRoute', [])
	.config(function($routeProvider, $locationProvider, $httpProvider) {
		$routeProvider
			.when('/', {
				templateUrl: '/home/partials/index'
			})
			.when('/p/:slug-:id?', {
				templateUrl: '/home/partials/post/show'
			})
			.when('/category/:slug', {
				templateUrl: '/home/partials/category/index'
			})
			.when('/author/:slug-:id', {
				templateUrl: '/home/partials/author/index'
			})
			.when('/tag/:slug-:id', {
				templateUrl: '/home/partials/tag/index'
			})
			.when('/:controller/:action?', {
				templateUrl: function(params) {
					var allowedParams = ['controller', 'action'];
					var paramVals = [];
					for (var key in params) {
						if (allowedParams.indexOf(key) !== -1) {
							paramVals.push(params[key]);
						}
					}
					return '/home/partials/' + paramVals.join('/');
				}
			})
			.otherwise({
				redirectTo: '/'
			});

		//$httpProvider.useApplyAsync(true);

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false,
			rewriteLinks: true
		});

		$httpProvider.interceptors.push(function($rootScope, $q, $localStorage) {
			return {
				request: function(config) {
					config.headers = config.headers || {};
					if ($localStorage.token) {
						config.headers.Authorization = 'Bearer ' + $localStorage.token;
					}
					return config;
				},
				response: function(res) {
					if (res.status === 401) {
						// Handle unauthenticated user.
						//$location.path('/auth/login');
					}
					return res || $q.when(res);
				}
			};
		});

	});