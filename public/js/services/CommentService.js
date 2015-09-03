angular.module('CommentService', [])
	.factory('Comment', function(Restangular) {
		return Restangular.service('comment');
	});