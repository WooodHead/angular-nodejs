angular
	.module('NavigationController', [])
	.controller('NavigationController', function($scope, $location) {
		$scope.isActive = function(location) {
			return location === $location.path();
		};
	});