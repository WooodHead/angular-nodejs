angular
	.module('AuthorController', [])
	.controller('AuthorController', function($scope, $routeParams, Author) {
		$scope.init = function() {
			Author.one($routeParams.id).get().then(function(data) {
				$scope.user = data.user;
				$scope.posts = data.posts.data;
			});
		}
	});