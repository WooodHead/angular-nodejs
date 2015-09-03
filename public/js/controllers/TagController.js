angular
	.module('TagController', [])
	.controller('TagController', function($scope, $routeParams, Tag) {
		$scope.getList = function() {
			Tag.getList().then(function(tags) {
				$scope.tags = tags;
			});

			$scope.orderProp = 'id';
		}


		$scope.create = function() {

			Tag.post($scope.form).then(function(response) {
				console.log(response);
				$scope.form = {};
			}, function(response) {
				console.log(response);
			});
		}

		$scope.findEdit = function() {
			Tag.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function() {
			var data = {
				name: $scope.formData.name,
				slug: $scope.formData.slug
			};

			Tag.one($routeParams.id).put(data).then(function(response) {

			}, function(response) {

			});
		}


		$scope.remove = function(tag) {

			tag.remove().then(function(response) {

				var index = $scope.tags.indexOf(tag);

				$scope.tags.splice(index, 1);

			}, function(response) {


			});
		}
	});