angular
    .module('MainController', [])
    .controller('MainController', function($scope, $location, $localStorage, Auth) {
        /**
         * Responsible for highlighting the currently active menu item in the navbar.
         *
         * @param route
         * @returns {boolean}
         */
        $scope.isActive = function(route) {

            return route === $location.path();
        };

        /**
         * Query the authenticated user by the Authorization token from the header.
         *
         * @param user {object} If provided, it won't query from database, but take this one.
         * @returns {null}
         */
        $scope.getAuthenticatedUser = function(user) {
            if (user) {
                $scope.authUser = user;
                return;
            }

            if (typeof $localStorage.token === 'undefined') {
                return null;
            }

            Auth.one('me').get().then(function(user) {
                $scope.authUser = user;
            }, function(err) {
                console.log(err);
            });
        };

        $scope.logout = function() {
            delete $localStorage.token;
            $scope.authUser = null;
        };
    });