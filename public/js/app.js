'use strict';
angular.module('Beep', [
	'ngRoute',
	'appRoute',
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
]).config(function(RestangularProvider) {
	RestangularProvider.setBaseUrl('/admin/api/v1');
});