angular
	.module('RightController', [])
	.controller('RightController', function($scope, Tag, Category) {
		$scope.listCategory = function() {
			Category.one().getList('all').then(function(data) {
				$scope.categories = data;
			});
		}

		$scope.listTag = function() {
			Tag.one().getList('all').then(function(data) {
				$scope.tags = data;
			});
		}
	});