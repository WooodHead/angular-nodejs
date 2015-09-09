angular
	.module('TagController', [])
	.controller('TagController', function($scope, $rootScope, $routeParams, Tag) {
		$scope.init = function() {
			Tag.one($routeParams.id).get().then(function(data) {
				$rootScope.page_title = 'Tag: ' + data.tag.name;
				$scope.tag = data.tag;
				$scope.posts = data.posts.data;
			});
		}
	});