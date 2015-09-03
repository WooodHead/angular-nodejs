angular.module('PostService', [])
	.factory('Post', function(Restangular) {
		return Restangular.service('post');
	});