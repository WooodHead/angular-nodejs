angular.module('AuthService', [])
	.factory('Auth', function(Restangular) {
		return Restangular.service('auth');
	});