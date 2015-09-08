angular
	.module('ProfileController', ['ngFileUpload'])
	.controller('ProfileController', function($scope, Upload, Profile, Notification) {

		$scope.setup = function() {
			Profile.one().get().then(function(response) {
				$scope.infoUser = response;
			}, function(err) {
				console.log(err);
			})
		}

		$scope.init = function() {
			$scope.formUser = $scope.authUser;
		}

		$scope.update = function() {
			var user = {
				name: $scope.formUser.name,
				password: $scope.formUser.password
			};

			Profile.one().patch(user).then(function(response) {
				$scope.formUser.password = "";
				Notification.primary({
					title: response.title,
					message: response.message
				});
			}, function(err) {
				console.log(err);
				$scope.errors = err.data.errors;
			});
		}

		$scope.changeAvatar = function() {
			if ($scope.avatar && !$scope.avatar.$error) {
				$scope.upload($scope.avatar);
			}
		}

		$scope.upload = function(file) {
			$scope.f = {};
			$scope.f.isProcess = true;
			$scope.f.isUpload = true;
			$scope.f.isDone = false;
			Upload.upload({
				headers: {
					'Content-Type': file.type
				},
				method: 'POST',
				url: '/admin/api/v1/upload',
				sendFieldsAs: 'form',
				file: file
			}).progress(function(evt) {
				$scope.f.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
			}).success(function(data, status, headers, config) {
				$scope.f.isProcess = false;
				$scope.f.isDone = true;
				$scope.authUser.image = data.image;
			}).error(function(data, status, headers, config) {
				console.log(data);
			})
		}
	});