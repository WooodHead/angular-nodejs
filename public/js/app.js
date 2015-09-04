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
]).config(function($compileProvider, RestangularProvider) {
	$compileProvider.debugInfoEnabled(true);
	RestangularProvider.setBaseUrl('/admin/api/v1');
	//RestangularProvider.setRequestSuffix('.json');
	RestangularProvider.setDefaultHeaders({
		'Content-Type': 'application/json'
	});
	//RestangularProvider.setDefaultRequestParams({format: 'json'});
});