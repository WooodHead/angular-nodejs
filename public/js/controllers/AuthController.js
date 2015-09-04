angular
	.module('AuthController', [])
	.controller('AuthController', function($scope, $location, $localStorage, Auth) {
		$scope.login = function() {
			var credentials = {
				email: $scope.login.email,
				password: $scope.login.password,
			};

			Auth.one().post('login', credentials).then(function(response) {
				$scope.errors = {};
				console.log(response);
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				$location.path("/admin");
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}

		$scope.register = function() {
			var credentials = {
				name: $scope.reg.name,
				email: $scope.reg.email,
				password: $scope.reg.password,
				password_confirmation: $scope.reg.password_confirmation
			};
			Auth.one().post('register', credentials).then(function(response) {
				console.log(response);
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				$location.path("/admin");
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}
	});