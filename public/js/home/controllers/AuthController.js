angular
	.module('AuthController', [])
	.controller('AuthController', function($scope, $location, $localStorage, Auth) {

		$scope.login = function() {
			var credentials = {
				email: $scope.loginForm.email,
				password: $scope.loginForm.password,
			};

			Auth.one().post('login', credentials).then(function(response) {
				$scope.loginForm = {};
				$scope.errors = {};
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);
				// If login is successful, redirect to home page
				$('#myModal').modal('hide');
				//$location.path("/");
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		};

		$scope.register = function() {

			Auth.one().post('register', $scope.regForm).then(function(response) {
				$scope.errors = {};
				$scope.regForm = {};
				$localStorage.token = response.token;
				$scope.getAuthenticatedUser(response.data);

				// If login is successful, redirect to home page
				$location.path("/");
			}, function(response) {
				console.log(response);
				$scope.errors = response.data.errors;
			});

		};
	});