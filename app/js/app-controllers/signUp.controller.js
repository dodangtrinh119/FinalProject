/**
 * Created by nmtuan on 06-Jun-16.
 */
appControllers.controller('signUpController', ['$scope', 'authService',
    function ($scope, authService) {

        $scope.account = "";
        $scope.password = "";
        $scope.passwordConfirm = "";

        $scope.userInfo = new UserInfo();
        $scope.createAccount = function () {

            //Check basic constraint
            if ($scope.password != $scope.passwordConfirm) {
                window.alert("Password does not match");
                return;
            }

            //Create User
            $scope.userInfo.headline = 'Work in ' + $scope.userInfo.workInfo.industry + ' at ' + $scope.userInfo.workInfo.location;
            authService.createUser($scope.account, $scope.password, $scope.userInfo, function (error) {
                if (error)
                    window.alert(error);
            });

        }
    }]);