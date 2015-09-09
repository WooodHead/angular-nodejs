angular
	.module('PostController', ['ngSanitize'])
	.controller('PostController', function($scope, $rootScope, $routeParams, Post) {
		$scope.findPost = function() {
			Post.one($routeParams.id).get().then(function(data) {
				$rootScope.page_title = data.name;
				$scope.post = data;
			});
		}

		$scope.listComment = function() {
			Post.one($routeParams.id).one('comment').get().then(function(response) {
				$scope.comments = response.data;
				$scope.itemsPerPage = response.per_page;
				$scope.totalItems = response.total;
				$scope.currentPage = response.current_page;
			});
		}
	});