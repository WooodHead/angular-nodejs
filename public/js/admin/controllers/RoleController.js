angular.module('RoleController', ['frapontillo.bootstrap-duallistbox'])
	.controller('RoleController', function($scope, $routeParams, Role, Permission, Notification) {
		$scope.getList = function() {
			Role.getList().then(function(datas) {
				$scope.roles = datas;
			}, function(err) {

			});
		}

		$scope.findEdit = function() {
			Role.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});

			Permission.one().getList('all').then(function(data) {
				$scope.permissions = data;
			}, function(err) {

			});
		}

		$scope.create = function() {
			var newData = {
				name: $scope.formData.name,
				description: $scope.formData.description
			}

			Role.post(newData).then(function(response) {
				$scope.formData.name = '';
				$scope.formData.description = '';
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function() {

			});
		}

		$scope.update = function(role) {

			role.name = $scope.formData.name;
			role.permissions = $scope.formData.permissions;

			role.put().then(function(response) {
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

		$scope.remove = function(data) {

			data.remove().then(function(response) {
				var index = $scope.roles.indexOf(data);

				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

				$scope.roles.splice(index, 1);

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}

		$scope.settings = {
			bootstrap2: false,
			filterClear: 'Show all!',
			filterPlaceHolder: 'Filter!',
			moveSelectedLabel: 'Move selected only',
			moveAllLabel: 'Move all!',
			removeSelectedLabel: 'Remove selected only',
			removeAllLabel: 'Remove all!',
			moveOnSelect: true,
			preserveSelection: 'moved',
			selectedListLabel: 'The selected',
			nonSelectedListLabel: 'The unselected',
			postfix: '_helperz',
			selectMinHeight: 250,
			filter: true,
			filterNonSelected: '',
			filterSelected: '',
			infoAll: 'Showing all {0}!',
			infoFiltered: '<span class="label label-warning">Filtered</span> {0} from {1}!',
			infoEmpty: 'Empty list!',
			filterValues: true
		};
	});