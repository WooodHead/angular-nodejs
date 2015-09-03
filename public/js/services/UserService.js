angular.module('UserService', [])
	.factory('User', function(Restangular) {
		return Restangular.service('user');
	});