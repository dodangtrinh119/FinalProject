/**
 * Created by nmtuan on 05-Jun-16.
 */
appControllers.controller('signInController', ['$scope', '$location', 'authService',
    function ($scope, $location, authService) {

        $scope.account = "";
        $scope.password = "";
        $scope.disabled = false;
        $scope.signIn = function () {
            $scope.disabled = true;
            authService.loginUser($scope.account, $scope.password, function (error) {
                if (error)
                    window.alert(error);
                $scope.disabled = false;
                $scope.$applyAsync();
            });
        };
        $scope.googleSignIn = function () {
            authService.loginWithGoogle(function (error) {
                if (error)
                    window.alert(error);
            });
        };
        $scope.facebookSignIn = function () {
            window.alert("work in progress");
        };

        $scope.signUp = function () {
            $location.path('/sign-up');
        }
    }]);