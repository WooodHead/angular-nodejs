angular.module('RoleService', [])
	.factory('Role', function(Restangular) {
		return Restangular.service('role');
	});