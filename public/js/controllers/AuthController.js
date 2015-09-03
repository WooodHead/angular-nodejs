angular
	.module('AuthController', [])
	.controller('AuthController', function($scope, $location, $localStorage, Auth) {
		$scope.login = function() {
			var credentials = {
				email: $scope.login.email,
				password: $scope.login.password,
			}
			Auth.one().post('login', credentials).then(function(response) {
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response);
				$location.path("/admin");
			}, function(err) {

				$scope.errors = err.data.errors;
			});
			/*
			$auth.login(credentials).then(function(response) {
				$localStorage.token = response.data.token;
				$scope.getAuthenticatedUser(response.data);

				// If login is successful, redirect to home page
				$location.path("/admin");
			}, function(response) {
				$scope.errors = response.data.errors;
			});
*/
		}
	});