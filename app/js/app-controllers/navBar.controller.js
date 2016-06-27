/**
 * Created by nmtuan on 08-Jun-16.
 */
appControllers.controller('navBarController', ['$scope', '$location', 'authService', 'dataService',
    function ($scope, $location, authService, dataService) {

        $scope.showContext = false;
        $scope.logOut = function () {
            authService.logoutUser();
        };
        $scope.backToProfile = function () {
            $location.path('/profile');
        };
    
        var currentUser = authService.getCurrentUser();
        var loadData = function (userId) {
            dataService.bind('users/' + userId, function (snapshot) {
                if (snapshot.exists()) {
                    var data = snapshot.val();
                    $scope.userName = data.name;
                    $scope.userImage = data.profileImg;
    
                    $scope.$applyAsync();
                }
            });
        };
    
        if (currentUser)
            loadData(currentUser.uid)
        else {
            authService.onAuthStateChanged(function (user) {
                if (user)
                    loadData(user.uid);
            })
        }
    }]);