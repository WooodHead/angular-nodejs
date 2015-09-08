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