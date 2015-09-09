angular
	.module('CategoryController', [])
	.controller('CategoryController', function($scope, $rootScope, $routeParams, Category) {
		$scope.init = function() {
			Category.one($routeParams.slug).get().then(function(data) {
				$rootScope.page_title = 'Category: ' + data.cat.name;
				$scope.category = data.cat;
				$scope.posts = data.posts.data;
			});
		}
	});