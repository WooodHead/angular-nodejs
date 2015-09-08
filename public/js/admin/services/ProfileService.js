angular.module('ProfileService', [])
	.factory('Profile', function(Restangular) {
		return Restangular.service('profile');
	});