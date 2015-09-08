angular.module('TagService', [])
	.factory('Tag', function(Restangular) {
		return Restangular.service('tag');
	});