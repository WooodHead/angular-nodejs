angular
	.module('CategoryController', [])
	.controller('CategoryController', function($scope, $routeParams, Category) {
		$scope.init = function() {
			Category.one($routeParams.slug).get().then(function(data) {
				$scope.category = data.category;
				$scope.posts = data.posts.data;
			});
		}
	});