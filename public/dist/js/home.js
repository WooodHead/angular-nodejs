'use strict';
angular.module('Beep', [
	'ngRoute',
	'ngStorage',
	'satellizer',
	'appRoute',
	'angularMoment',
	'restangular',
	'IndexController',
	'AuthController',
	'AuthorController',
	'CategoryController',
	'CommentController',
	'MainController',
	'PostController',
	'TagController',
	'RightController',

	'AuthService',
	'AuthorService',
	'CategoryService',
	'PostService',
	'TagService'
]).config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('/api/v1');
}).constant('angularMomentConfig', {
	//preprocess: 'utc', // optional
	locale: 'vi',
	timezone: 'Asia/Ho_Chi_Minh' // optional
});
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
angular
	.module('AuthController', [])
	.controller('AuthController', function($scope, $location, $localStorage, Auth) {

		$scope.login = function() {
			var credentials = {
				email: $scope.loginForm.email,
				password: $scope.loginForm.password,
			}

			Auth.one().post('login', credentials).then(function(response) {
				$scope.loginForm = {};
				$scope.errors = {};
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				// If login is successful, redirect to home page
				$('#myModal').modal('hide');
				//$location.path("/");
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.register = function() {

			Auth.post($scope.regForm).then(function(response) {
				$scope.errors = {};
				$scope.regForm = {};
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response);

				// If login is successful, redirect to home page
				$location.path("/");
			}, function(response) {
				console.log(response);
				$scope.errors = response.data.errors;
			});

		}
	});
angular
	.module('AuthorController', [])
	.controller('AuthorController', function($scope, $routeParams, Author) {
		$scope.init = function() {
			Author.one($routeParams.id).get().then(function(data) {
				$scope.user = data.user;
				$scope.posts = data.posts.data;
			});
		}
	});
angular
	.module('CategoryController', [])
	.controller('CategoryController', function($scope, $routeParams, Category) {
		$scope.init = function() {
			Category.one($routeParams.slug).get().then(function(data) {
				$scope.category = data.category;
				$scope.posts = data.posts.data;
			});
		}
	});
angular
	.module('CommentController', [])
	.controller('CommentController', function($scope, Post) {
		$scope.comment = function() {
			var cmt = {
				comment: $scope.commentForm.comment
			};

			$scope.post.all('comment').post(cmt).then(function(response) {
				$scope.commentForm = {};
				$scope.comments.push(response);
			});


		}


	});
angular
	.module('IndexController', [])
	.controller('IndexController', function($scope, Post) {
		$scope.init = function() {
			Post.one().get().then(function(response) {
				$scope.posts = response.data;
			});
		}
	});
angular
    .module('MainController', [])
    .controller('MainController', function($scope, $location, $localStorage, Auth) {
        /**
         * Responsible for highlighting the currently active menu item in the navbar.
         *
         * @param route
         * @returns {boolean}
         */
        $scope.isActive = function(route) {

            return route === $location.path();
        };

        /**
         * Query the authenticated user by the Authorization token from the header.
         *
         * @param user {object} If provided, it won't query from database, but take this one.
         * @returns {null}
         */
        $scope.getAuthenticatedUser = function(user) {
            if (user) {
                $scope.authUser = user;
                return;
            }

            if (typeof $localStorage.token === 'undefined') {
                return null;
            }

            Auth.one('me').get().then(function(user) {
                $scope.authUser = user;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.logout = function() {
            delete $localStorage.token;
            $scope.authUser = null;
        };
    });
angular
	.module('PostController', ['ngSanitize'])
	.controller('PostController', function($scope, $routeParams, Post) {
		$scope.findPost = function() {
			Post.one($routeParams.id).get().then(function(data) {
				$scope.post = data;
			});
		}

		$scope.listComment = function() {
			Post.one($routeParams.id).one('comment').get().then(function(response) {
				$scope.comments = response.data;
				$scope.itemsPerPage = response.per_page;
				$scope.totalItems = response.total;
				$scope.currentPage = response.current_page;
			});
		}
	});
angular
	.module('RightController', [])
	.controller('RightController', function($scope, Tag, Category) {
		$scope.listCategory = function() {
			Category.one().getList('all').then(function(data) {
				$scope.categories = data;
			});
		}

		$scope.listTag = function() {
			Tag.one().getList('all').then(function(data) {
				$scope.tags = data;
			});
		}
	});
angular
	.module('TagController', [])
	.controller('TagController', function($scope, $routeParams, Tag) {
		$scope.init = function() {
			Tag.one($routeParams.id).get().then(function(data) {
				$scope.tag = data.tag;
				$scope.posts = data.posts.data;
			});
		}
	});
angular.module('AuthService', [])
	.factory('Auth', function(Restangular) {
		return Restangular.service('auth');
	});
angular.module('AuthorService', [])
	.factory('Author', function(Restangular) {
		return Restangular.service('author');
	});
angular.module('CategoryService', [])
	.factory('Category', function(Restangular) {
		return Restangular.service('category');
	});
angular.module('PostService', [])
	.factory('Post', function(Restangular) {
		return Restangular.service('post');
	});
angular.module('TagService', [])
	.factory('Tag', function(Restangular) {
		return Restangular.service('tag');
	});