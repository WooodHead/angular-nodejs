angular
	.module('AuthorController', [])
	.controller('AuthorController', function($scope, $rootScope, $routeParams, Author) {
		$scope.init = function() {
			Author.one($routeParams.id).get().then(function(data) {
				$rootScope.page_title = 'Author: ' + data.user.name;
				$scope.user = data.user;
				$scope.posts = data.posts.data;
			});
		}
	});