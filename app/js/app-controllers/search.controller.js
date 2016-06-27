/**
 * Created by nmtuan on 09-Jun-16.
 */
appControllers.controller("searchController", ['$scope',
    function ($scope) {

        $scope.showDropdown = false;
        $scope.query = "";
        $scope.users = [];

        $scope.onQueryChange = function () {

        }
    }]);