angular
	.module('UserManagerController', [])
	.controller('UserManagerController', function($scope, $routeParams, Role, UserManager, Notification) {
		$scope.getList = function() {

			UserManager.getList().then(function(data) {
				$scope.managers = data;

			}, function() {
				//not found
			});

			$scope.orderProp = 'name';
		}

		$scope.findEdit = function() {
			UserManager.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var data = {
				name: $scope.formData.name,
				email: $scope.formData.email,
				password: $scope.formData.password
			}

			UserManager.post(data).then(function(response) {
				$scope.formData = {};
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.update = function() {
			var data = {
				name: $scope.formData.name,
				email: $scope.formData.email,
				password: $scope.formData.password
			}

			UserManager.one($routeParams.id).put(data).then(function(response) {
				Notification({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
			});
		}

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.managers.indexOf(data);

				Notification({
					title: response.title,
					message: response.message
				});

				$scope.managers.splice(index, 1);

			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});

			});
		}
	});