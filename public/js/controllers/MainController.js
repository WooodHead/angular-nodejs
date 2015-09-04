angular
	.module('MainController', [])
	.controller('MainController', function($scope, $location, $localStorage, Auth) {

		$scope.isActive = function(route) {
			if (angular.isString(route)) {
				return ($location.path().search(route) > -1);
			}
		};

		$scope.getAuthenticatedUser = function(user) {

			if (user) {
				$scope.authUser = user;
				return;
			}

			if (typeof $localStorage.token === 'undefined') {
				$location.path('/admin/auth/login');
				//return null;
			}

			Auth.one('me').get().then(function(user) {
				$scope.authUser = user;
			}, function(err) {
				$location.path('/admin/auth/login');
				console.log(err);
			});
		};

		$scope.logout = function() {
			delete $localStorage.token;
			$scope.authUser = null;
			$location.path('/admin/auth/login');
		};
	});