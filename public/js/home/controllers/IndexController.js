angular
	.module('IndexController', [])
	.controller('IndexController', function($scope, $rootScope, Post) {
		$scope.init = function() {
			$rootScope.page_title = 'Home';
			Post.one().get().then(function(response) {
				$scope.posts = response.data;
			});
		}
	});