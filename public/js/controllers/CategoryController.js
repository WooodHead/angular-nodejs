angular
	.module('CategoryController', [])
	.controller('CategoryController', function($scope, $routeParams, Notification, Category) {

		Category.getList().then(function(datas) {
			$scope.categories = datas;

		}, function() {
			//not found
		});

		$scope.orderProp = 'name';

		$scope.findEdit = function() {
			Category.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
			};

			Category.post(newData).then(function(response) {
				$scope.formData = {};
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.update = function(category) {

			category.name = $scope.formData.name;

			category.patch().then(function(response) {
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});
			});
		}

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.categories.indexOf(data);

				Notification.primary({
					title: response.title,
					message: response.message
				});

				$scope.categories.splice(index, 1);

			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});

			});
		}
	});