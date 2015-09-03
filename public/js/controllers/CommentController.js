angular
	.module('CommentController', ['angularUtils.directives.dirPagination'])
	.controller('CommentController', function($scope, $routeParams, Comment, Notification) {
		$scope.init = function() {
			Comment.one().get().then(function(data) {
				$scope.comments = data.data;
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
			Comment.one().get({
					page: page
				})
				.then(function(result) {
					$scope.comments = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				}, function(err) {

				});
		}

		$scope.findEdit = function() {
			Comment.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function() {

			var data = {
				content: $scope.formData.content
			};

			Comment.one($routeParams.id).put(data).then(function(response) {
				Notification({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.errors;
			});
		}

		$scope.remove = function(data) {

			Comment.one(data.id).remove().then(function(response) {
				var index = $scope.comments.indexOf(data);

				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

				$scope.comments.splice(index, 1);

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}
	});