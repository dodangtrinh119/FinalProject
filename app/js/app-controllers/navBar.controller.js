/**
 * Created by nmtuan on 08-Jun-16.
 */
appControllers.controller('navBarController', ['$scope', '$location', 'authService', 'dataService',
    function ($scope, $location, authService, dataService) {

        $scope.showContext = false;
        $scope.hideContext = function () {
            $scope.showContext = false;
        };

        $scope.logOut = function () {
            authService.logoutUser();
        };
        $scope.backToHome = function () {
            $location.path('/profile');
        };
    
        $scope.currentUser = authService.getCurrentUser();
        var loadData = function (userId) {
            var firebaseRef = dataService.createFirebaseRef('users/' + userId);
            dataService.bind(firebaseRef, function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    $scope.userName = data.name;
                    $scope.userImage = data.profileImg;
    
                    $scope.$applyAsync();
                }
            });
        };
    
        if ($scope.currentUser)
            loadData($scope.currentUser.uid)
        else {
            authService.onAuthStateChanged(function (user) {
                if (user) {
                    $scope.currentUser = user;
                    loadData(user.uid);
                }
            })
        }
    }]);