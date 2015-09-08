angular.module('AuthorService', [])
	.factory('Author', function(Restangular) {
		return Restangular.service('author');
	});