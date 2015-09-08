angular
	.module('IndexController', [])
	.controller('IndexController', function($scope, Post) {
		$scope.init = function() {
			Post.one().get().then(function(response) {
				$scope.posts = response.data;
			});
		}
	});