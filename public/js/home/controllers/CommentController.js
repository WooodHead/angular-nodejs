angular
	.module('CommentController', [])
	.controller('CommentController', function($scope, Post) {
		$scope.comment = function() {
			var cmt = {
				comment: $scope.commentForm.comment
			};

			$scope.post.all('comment').post(cmt).then(function(response) {
				$scope.commentForm = {};
				$scope.comments.push(response);
			});


		}


	});