/**
 * Created by nmtuan on 05-Jun-16.
 */
appControllers.controller('signInController', ['$scope', '$location', 'authService',
    function ($scope, $location, authService) {

        $scope.account = "";
        $scope.password = "";
        $scope.disabled = false;
        $scope.signIn = function () {
             ga('send', {
                hitType: 'event',
                eventCategory: 'SignIn',
                eventAction: 'click',
                eventLabel: 'Normal Sign In'
                });
            $scope.disabled = true;
            authService.loginUser($scope.account, $scope.password, function (error) {
                if (error)
                    window.alert(error);
                $scope.disabled = false;
                $scope.$applyAsync();
            });
        };
        $scope.googleSignIn = function () {
             ga('send', {
                hitType: 'event',
                eventCategory: 'SignInWithGG',
                eventAction: 'click',
                eventLabel: 'Google SignIn'
                });
            authService.loginWithGoogle(function (error) {
                if (error)
                    window.alert(error);
            });
        };
        $scope.facebookSignIn = function () {
            ga('send', {
                hitType: 'event',
                eventCategory: 'SignInWithFB',
                eventAction: 'click',
                eventLabel: 'Facebook Sign In'
                });
            window.alert("work in progress");
        };

        $scope.signUp = function () {
            ga('send', {
                hitType: 'event',
                eventCategory: 'SignUp',
                eventAction: 'click',
                eventLabel: 'Normal Sign Up'
                });
            $location.path('/sign-up');
        }
    }]);