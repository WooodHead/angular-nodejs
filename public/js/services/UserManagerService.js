angular.module('UserManagerService', [])
	.factory('UserManager', function(Restangular) {
		return Restangular.service('user-manager');
	});