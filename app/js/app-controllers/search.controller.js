/**
 * Created by nmtuan on 09-Jun-16.
 */
appControllers.controller("searchController", ['$scope', '$location', 'dataService',
    function ($scope, $location, dataService) {
        window.sc1 = $scope;
        var ctrl = this;
        
        $scope.showDropdown = false;
        $scope.query = "";
        $scope.users = [];
        $scope.profiles = [];

        var queryRef = null;
        var listenerRef = null;
        $scope.onQueryChange = function () {
            
            dataService.unbind(queryRef, listenerRef);

            queryRef = dataService.createFirebaseRef('users')
                                    .orderByChild('displayName')
                                    .equalTo($scope.query)
                                    .limitToFirst(5);

            listenerRef = dataService.bind(queryRef, function (snapshot) {
                $scope.users = snapshot.val();
                if ($scope.users)
                    $scope.profiles = Object.keys($scope.users);
                else
                    $scope.profiles = [];

                $scope.$applyAsync();
            });
        }

        $scope.profileClick = function (index) {
            $location.path('/profile/' + $scope.profiles[index]);
        };
    }]);