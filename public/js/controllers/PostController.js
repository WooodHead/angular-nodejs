angular
	.module('PostController', [
		'summernote',
		'angularUtils.directives.dirPagination',
		'ui.select2'
	])
	.controller('EditorController', function($scope) {
		$scope.options = {
			height: 300,
			toolbar: [
				['edit', ['undo', 'redo']],
				['headline', ['style']],
				['style', ['bold', 'italic', 'underline', 'superscript', 'subscript', 'strikethrough', 'clear']],
				['fontface', ['fontname']],
				['textsize', ['fontsize']],
				['fontclr', ['color']],
				['alignment', ['ul', 'ol', 'paragraph', 'lineheight']],
				['height', ['height']],
				['table', ['table']],
				['insert', ['link', 'picture', 'video', 'hr']],
				['view', ['fullscreen', 'codeview']],
				['help', ['help']]
			]
		};
	})
	.controller('PostController', function($scope, $http, $routeParams, Notification, Post, Category, Tag) {

		$scope.select2Options = {
			allowClear: true,
			multiple: true
		};

		Tag.getList().then(function(datas) {
			$scope.tags = datas;
		}, function() {
			//not found
		});

		Category.getList().then(function(datas) {
			$scope.categories = datas;

		}, function() {
			//not found
		});

		$scope.getList = function() {
			Post.one().get().then(function(response) {
				$scope.posts = response.data;
				$scope.itemsPerPage = response.per_page;
				$scope.totalItems = response.total;
				$scope.currentPage = response.current_page;
			}, function(response) {
				//not found
			});
		}

		$scope.pageChanged = function(page) {
			$scope.currentPage = page;
			getResultsPage(page);
		}

		function getResultsPage(page) {
			Post.one().get({
					page: page
				})
				.then(function(result) {
					$scope.permissions = result.data;
					$scope.itemsPerPage = result.per_page;
					$scope.totalItems = result.total;
					$scope.currentPage = result.current_page;
				});
		}



		$scope.create = function() {
			var newPost = {
				name: $scope.form.name,
				categories: $scope.form.category,
				tags: $scope.form.tag,
				content: $scope.form.content,
				description: $scope.form.description
			};
			Post.post(newPost).then(function(response) {
				console.log(response);
				$scope.form = {};
				Notification.primary({
					message: response.message
				});
			}, function(err) {
				$scope.errors = err.data.errors;
				console.log(err);
				Notification.error({
					title: err.title,
					message: err.data.message
				});
			});
		}


		$scope.remove = function(post) {

			Post.one(post.id).remove().then(function(response) {
				if (response.status) {
					var index = $scope.posts.indexOf(post);

					Notification.primary({
						title: response.title,
						message: response.message
					});
					$scope.posts.splice(index, 1);
				}

			}, function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});

			});
		}

		$scope.findOne = function() {

			Post.one($routeParams.id).get().then(function(data) {
				$scope.formData = data;
			});
		}

		$scope.update = function(post) {

			post.name = $scope.formData.name;
			post.slug = $scope.formData.slug;
			post.description = $scope.formData.description;
			post.content = $scope.formData.content;
			post.categories = $scope.formData.categories;
			post.tags = $scope.formData.tags;

			post.put().then(function(response) {
				Notification({
					title: response.title,
					type: response.type,
					message: response.message
				});
			}, function(response) {
				Notification.error({
					title: response.title,
					message: response.message
				});
			});
		}

	});