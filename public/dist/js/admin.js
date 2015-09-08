'use strict';
angular.module('Beep', [
	'ngRoute',
	'appRoute',
	'ngAnimate',
	'restangular',
	'ngStorage',
	'ui-notification',

	'AuthController',
	'MainController',
	'DashboardController',
	'IndexController',
	'TagController',
	'PostController',
	'CategoryController',
	'CommentController',
	'RoleController',
	'PermissionController',
	'ProfileController',
	'UserManagerController',
	'NavigationController',

	'AuthService',
	'UserService',
	'PostService',
	'CategoryService',
	'CommentService',
	'RoleService',
	'TagService',
	'UserManagerService',
	'PermissionService',
	'ProfileService'
]).config(function($compileProvider, RestangularProvider) {
	$compileProvider.debugInfoEnabled(true);
	RestangularProvider.setBaseUrl('/admin/api/v1');
	//RestangularProvider.setRequestSuffix('.json');
	RestangularProvider.setDefaultHeaders({
		'Content-Type': 'application/json'
	});
	//RestangularProvider.setDefaultRequestParams({format: 'json'});
});
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
angular
	.module('AuthController', [])
	.controller('AuthController', function($scope, $location, $localStorage, Auth) {

		$scope.login = function() {
			var credentials = {
				email: $scope.login.email,
				password: $scope.login.password,
			};

			Auth.one().post('login', credentials).then(function(response) {
				$scope.errors = {};
				console.log(response);
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				$location.path("/admin");
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}

		$scope.register = function() {
			var credentials = {
				name: $scope.reg.name,
				email: $scope.reg.email,
				password: $scope.reg.password,
				password_confirmation: $scope.reg.password_confirmation
			};
			Auth.one().post('register', credentials).then(function(response) {
				console.log(response);
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				$location.path("/admin");
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}
	});
angular
	.module('CategoryController', [])
	.controller('CategoryController', function($scope, $routeParams, Notification, Category) {

		Category.getList().then(function(datas) {
			$scope.categories = datas;

		}, function() {
			//not found
		});

		$scope.orderProp = 'name';

		$scope.findEdit = function() {
			Category.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
			};

			Category.post(newData).then(function(response) {
				$scope.formData = {};
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.update = function(category) {

			category.name = $scope.formData.name;

			category.patch().then(function(response) {
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});
			});
		}

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.categories.indexOf(data);

				Notification.primary({
					title: response.title,
					message: response.message
				});

				$scope.categories.splice(index, 1);

			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});

			});
		}
	});
angular
	.module('CommentController', ['angularUtils.directives.dirPagination'])
	.controller('CommentController', function($scope, $routeParams, Comment, Notification) {
		$scope.init = function() {
			Comment.one().get().then(function(data) {
				$scope.comments = data.data;
				$scope.itemsPerPage = data.per_page;
				$scope.totalItems = data.total;
				$scope.currentPage = data.current_page;
			});

		}

		$scope.pageChanged = function(page) {
			$scope.currentPage = page;
			getResultsPage(page);
		}

		function getResultsPage(page) {
			Comment.one().get({
					page: page
				})
				.then(function(result) {
					$scope.comments = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				}, function(err) {

				});
		}

		$scope.findEdit = function() {
			Comment.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function() {

			var data = {
				content: $scope.formData.content
			};

			Comment.one($routeParams.id).put(data).then(function(response) {
				Notification({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.errors;
			});
		}

		$scope.remove = function(data) {

			Comment.one(data.id).remove().then(function(response) {
				var index = $scope.comments.indexOf(data);

				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

				$scope.comments.splice(index, 1);

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}
	});
angular
	.module('DashboardController', [])
	.controller('DashboardController', function() {

	});
angular
	.module('IndexController', [])
	.controller('IndexController', ['$scope', function($scope) {

	}]);
angular
	.module('MainController', [])
	.controller('MainController', function($scope, $location, $localStorage, Auth) {

		$scope.isActive = function(route) {
			if (angular.isString(route)) {
				return ($location.path().search(route) > -1);
			}
		};

		$scope.getAuthenticatedUser = function(user) {

			if (user) {
				$scope.authUser = user;
				return;
			}

			if (typeof $localStorage.token === 'undefined') {
				//$location.path('/admin/auth/login');
				return null;
			}

			Auth.one('me').get().then(function(user) {
				$scope.authUser = user;
			}, function(err) {
				//$location.path('/admin/auth/login');
				delete $localStorage.token;
				console.log(err);
			});
		};

		$scope.logout = function() {
			delete $localStorage.token;
			$scope.authUser = null;
			$location.path('/admin/auth/login');
		};
	});
angular
	.module('NavigationController', [])
	.controller('NavigationController', function($scope, $location) {
		$scope.isActive = function(location) {
			return location === $location.path();
		};
	});
angular
	.module('PermissionController', ['angularUtils.directives.dirPagination'])
	.controller('PermissionController', function($scope, $routeParams, Permission, Notification) {
		$scope.getList = function() {
			Permission.one().get().then(function(data) {
				$scope.permissions = data.data;
				$scope.itemsPerPage = data.per_page;
				$scope.totalItems = data.total;
				$scope.currentPage = data.current_page;
			});

		}

		$scope.pageChanged = function(page) {
			$scope.currentPage = page;
			getResultsPage(page);
		}

		function getResultsPage(page) {
			Permission.one().get({
					page: page
				})
				.then(function(result) {
					$scope.permissions = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				}, function(err) {

				});
		}

		$scope.findEdit = function() {
			Permission.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
				slug: $scope.formData.slug,
				description: $scope.formData.description
			};

			Permission.post(newData).then(function(response) {
				if (response.status) {
					$scope.formData.name = '';
					$scope.formData.slug = '';
					$scope.formData.description = '';
					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});
				}
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.update = function(permission) {

			permission.name = $scope.formData.name;
			permission.slug = $scope.formData.slug;
			permission.description = $scope.formData.description;
			console.log(permission);
			permission.put().then(function(response) {
				if (response.status) {
					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});
				}
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.remove = function(data) {

			Permission.one(data.id).remove().then(function(response) {
				if (response.status) {
					var index = $scope.permissions.indexOf(data);

					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});

					$scope.permissions.splice(index, 1);
				}

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}
	});
angular
	.module('PostController', [
		'summernote',
		'angularUtils.directives.dirPagination',
		'ui.select2'
	])
	.controller('EditorController', function($scope) {
		$scope.options = {
			height: 300,
			toolbar: [
				['edit', ['undo', 'redo']],
				['headline', ['style']],
				['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
				['fontface', ['fontname']],
				['textsize', ['fontsize']],
				['fontclr', ['color']],
				['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
				['height', ['height']],
				['table', ['table']],
				['insert', ['link', 'picture', 'video', 'hr']],
				['view', ['fullscreen', 'codeview']],
				['help', ['help']]
			]
		};
	})
	.controller('PostController', function($scope, $http, $routeParams, Notification, Post, Category, Tag) {

		$scope.select2Options = {
			allowClear: true,
			multiple: true
		};

		Tag.getList().then(function(datas) {
			$scope.tags = datas;
		}, function() {
			//not found
		});

		Category.getList().then(function(datas) {
			$scope.categories = datas;

		}, function() {
			//not found
		});

		$scope.getList = function() {
			Post.one().get().then(function(response) {
				$scope.posts = response.data;
				$scope.itemsPerPage = response.per_page;
				$scope.totalItems = response.total;
				$scope.currentPage = response.current_page;
			}, function(response) {
				//not found
			});
		}

		$scope.pageChanged = function(page) {
			$scope.currentPage = page;
			getResultsPage(page);
		}

		function getResultsPage(page) {
			Post.one().get({
					page: page
				})
				.then(function(result) {
					$scope.permissions = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				});
		}



		$scope.create = function() {
			var newPost = {
				name: $scope.form.name,
				categories: $scope.form.category,
				tags: $scope.form.tag,
				content: $scope.form.content,
				description: $scope.form.description
			};
			Post.post(newPost).then(function(response) {
				console.log(response);
				$scope.form = {};
				Notification.primary({
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
				console.log(err);
				Notification.error({
					title: err.title,
					message: err.data.message
				});
			});
		}


		$scope.remove = function(post) {

			Post.one(post.id).remove().then(function(response) {

				var index = $scope.posts.indexOf(post);

				Notification.primary({
					title: response.title,
					message: response.message
				});
				$scope.posts.splice(index, 1);

			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});

			});
		}

		$scope.findOne = function() {

			Post.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function(post) {

			post.name = $scope.formData.name;
			post.slug = $scope.formData.slug;
			post.description = $scope.formData.description;
			post.content = $scope.formData.content;
			post.categories = $scope.formData.categories;
			post.tags = $scope.formData.tags;

			post.patch().then(function(response) {
				Notification({
					title: response.title,
					message: response.message
				});
			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});
			});
		}

	});
angular
	.module('ProfileController', ['ngFileUpload'])
	.controller('ProfileController', function($scope, Upload, Profile, Notification) {

		$scope.setup = function() {
			Profile.one().get().then(function(response) {
				$scope.infoUser = response;
			}, function(err) {
				console.log(err);
			})
		}

		$scope.init = function() {
			$scope.formUser = $scope.authUser;
		}

		$scope.update = function() {
			var user = {
				name: $scope.formUser.name,
				password: $scope.formUser.password
			};

			Profile.one().patch(user).then(function(response) {
				$scope.formUser.password = "";
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}

		$scope.changeAvatar = function() {
			if ($scope.avatar && !$scope.avatar.$error) {
				$scope.upload($scope.avatar);
			}
		}

		$scope.upload = function(file) {
			$scope.f = {};
			$scope.f.isProcess = true;
			$scope.f.isUpload = true;
			$scope.f.isDone = false;
			Upload.upload({
				headers: {
					'Content-Type': file.type
				},
				method: 'POST',
				url: '/admin/api/v1/upload',
				sendFieldsAs: 'form',
				file: file
			}).progress(function(evt) {
				$scope.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.f.isProcess = false;
				$scope.f.isDone = true;
				$scope.authUser.image = data.image;
			}).error(function(data, status, headers, config) {
				console.log(data);
			})
		}
	});
angular.module('RoleController', ['frapontillo.bootstrap-duallistbox'])
	.controller('RoleController', function($scope, $routeParams, Role, Permission, Notification) {
		$scope.getList = function() {
			Role.getList().then(function(datas) {
				$scope.roles = datas;
			}, function(err) {

			});
		}

		$scope.findEdit = function() {
			Role.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});

			Permission.one().getList('all').then(function(data) {
				$scope.permissions = data;
			}, function(err) {

			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
				description: $scope.formData.description
			}

			Role.post(newData).then(function(response) {
				$scope.formData.name = '';
				$scope.formData.description = '';
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function() {

			});
		}

		$scope.update = function(role) {

			role.name = $scope.formData.name;
			role.permissions = $scope.formData.permissions;

			role.put().then(function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.roles.indexOf(data);

				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

				$scope.roles.splice(index, 1);

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}

		$scope.settings = {
			bootstrap2: false,
			filterClear: 'Show all!',
			filterPlaceHolder: 'Filter!',
			moveSelectedLabel: 'Move selected only',
			moveAllLabel: 'Move all!',
			removeSelectedLabel: 'Remove selected only',
			removeAllLabel: 'Remove all!',
			moveOnSelect: true,
			preserveSelection: 'moved',
			selectedListLabel: 'The selected',
			nonSelectedListLabel: 'The unselected',
			postfix: '_helperz',
			selectMinHeight: 250,
			filter: true,
			filterNonSelected: '',
			filterSelected: '',
			infoAll: 'Showing all {0}!',
			infoFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}!',
			infoEmpty: 'Empty list!',
			filterValues: true
		};
	});
angular
	.module('TagController', [])
	.controller('TagController', function($scope, $routeParams, Tag, Notification) {

		$scope.pageClass = 'page-tag';

		$scope.getList = function() {
			Tag.getList().then(function(tags) {
				$scope.tags = tags;
			});

			$scope.orderProp = 'id';
		}


		$scope.create = function() {

			Tag.post($scope.form).then(function(response) {
				$scope.form = {};
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.findEdit = function() {
			Tag.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function() {
			var data = {
				name: $scope.formData.name
			};
			Tag.one($routeParams.id).patch(data)
				.then(function(response) {
					Notification.primary({
						message: response.message
					});
				}, function(err) {
					$scope.errors = err.data.errors;
				});
		}


		$scope.remove = function(tag) {

			tag.remove().then(function(response) {
				var index = $scope.tags.indexOf(tag);
				$scope.tags.splice(index, 1);

				Notification({
					title: response.title,
					message: response.message
				});

			}, function(err) {
				Notification.error({
					message: 'An error occurred'
				});
			});
		}
	});
angular
	.module('UserManagerController', [])
	.controller('UserManagerController', function($scope, $routeParams, Role, UserManager, Notification) {
		$scope.getList = function() {

			UserManager.getList().then(function(data) {
				$scope.managers = data;

			}, function() {
				//not found
			});

			$scope.orderProp = 'name';
		}

		$scope.findEdit = function() {
			UserManager.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var data = {
				name: $scope.formData.name,
				email: $scope.formData.email,
				password: $scope.formData.password
			}

			UserManager.post(data).then(function(response) {
				$scope.formData = {};
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.update = function() {
			var data = {
				name: $scope.formData.name,
				email: $scope.formData.email,
				password: $scope.formData.password
			}

			UserManager.one($routeParams.id).put(data).then(function(response) {
				Notification({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.managers.indexOf(data);

				Notification({
					title: response.title,
					message: response.message
				});

				$scope.managers.splice(index, 1);

			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});

			});
		}
	});
angular.module('AuthService', [])
	.factory('Auth', function(Restangular) {
		return Restangular.service('auth');
	});
angular.module('CategoryService', [])
	.factory('Category', function(Restangular) {
		return Restangular.service('category');
	});
angular.module('CommentService', [])
	.factory('Comment', function(Restangular) {
		return Restangular.service('comment');
	});
angular.module('PermissionService', [])
	.factory('Permission', function(Restangular) {
		return Restangular.service('permission');
	});
angular.module('PostService', [])
	.factory('Post', function(Restangular) {
		return Restangular.service('post');
	});
angular.module('ProfileService', [])
	.factory('Profile', function(Restangular) {
		return Restangular.service('profile');
	});
angular.module('RoleService', [])
	.factory('Role', function(Restangular) {
		return Restangular.service('role');
	});
angular.module('TagService', [])
	.factory('Tag', function(Restangular) {
		return Restangular.service('tag');
	});
angular.module('UserManagerService', [])
	.factory('UserManager', function(Restangular) {
		return Restangular.service('user-manager');
	});
angular.module('UserService', [])
	.factory('User', function(Restangular) {
		return Restangular.service('user');
	});