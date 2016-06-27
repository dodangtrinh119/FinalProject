/**
 * Created by nmtuan on 05-Jun-16.
 */
appControllers.controller('signInController', ['$scope', '$location', 'authService',
    function ($scope, $location, authService) {

        $scope.account = "";
        $scope.password = "";
        $scope.signIn = function () {
            authService.loginUser($scope.account, $scope.password, function (error) {
                if (error)
                    window.alert(error);
            });
        }
        $scope.signUp = function () {
            $location.path('/sign-up');
        }
    }]);