/**
 * Created by nmtuan on 09-Jun-16.
 */
appControllers.controller("searchController", ['$scope', 'dataService',
    function ($scope, dataService) {
        var ctrl = this;
        
        $scope.showDropdown = false;
        $scope.query = "";
        $scope.users = [];

        var lastQuery = "";
        $scope.onQueryChange = function () {
            lastQuery = $scope.query;
        }
    }]);