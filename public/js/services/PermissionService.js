angular.module('PermissionService', [])
	.factory('Permission', function(Restangular) {
		return Restangular.service('permission');
	});