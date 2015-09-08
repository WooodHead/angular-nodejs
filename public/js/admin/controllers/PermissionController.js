angular
	.module('PermissionController', ['angularUtils.directives.dirPagination'])
	.controller('PermissionController', function($scope, $routeParams, Permission, Notification) {
		$scope.getList = function() {
			Permission.one().get().then(function(data) {
				$scope.permissions = data.data;
				$scope.itemsPerPage = data.per_page;
				$scope.totalItems = data.total;
				$scope.currentPage = data.current_page;
			});

		}

		$scope.pageChanged = function(page) {
			$scope.currentPage = page;
			getResultsPage(page);
		}

		function getResultsPage(page) {
			Permission.one().get({
					page: page
				})
				.then(function(result) {
					$scope.permissions = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				}, function(err) {

				});
		}

		$scope.findEdit = function() {
			Permission.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
				slug: $scope.formData.slug,
				description: $scope.formData.description
			};

			Permission.post(newData).then(function(response) {
				if (response.status) {
					$scope.formData.name = '';
					$scope.formData.slug = '';
					$scope.formData.description = '';
					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});
				}
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.update = function(permission) {

			permission.name = $scope.formData.name;
			permission.slug = $scope.formData.slug;
			permission.description = $scope.formData.description;
			console.log(permission);
			permission.put().then(function(response) {
				if (response.status) {
					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});
				}
			}, function(response) {
				Notification({
					title: response.title,
					type: 'error',
					message: response.message
				});
			});
		}

		$scope.remove = function(data) {

			Permission.one(data.id).remove().then(function(response) {
				if (response.status) {
					var index = $scope.permissions.indexOf(data);

					Notification({
						title: response.title,
						type: response.type,
						message: response.message
					});

					$scope.permissions.splice(index, 1);
				}

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}
	});