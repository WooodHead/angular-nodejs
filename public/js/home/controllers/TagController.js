angular
	.module('TagController', [])
	.controller('TagController', function($scope, $routeParams, Tag) {
		$scope.init = function() {
			Tag.one($routeParams.id).get().then(function(data) {
				$scope.tag = data.tag;
				$scope.posts = data.posts.data;
			});
		}
	});