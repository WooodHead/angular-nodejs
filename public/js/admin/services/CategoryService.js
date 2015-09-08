angular.module('CategoryService', [])
	.factory('Category', function(Restangular) {
		return Restangular.service('category');
	});