/**
 * Created by nmtuan on 28-Apr-16.
 */
appControllers.controller('supportedOrganizationController', ['$scope',
    function ($scope) {
        //Remove organization
        $scope.removeOrganization = function (index) {
            $scope.supportedOrganizations.splice(index, 1);
            $scope.profile.setRemoteProperty('supportedOrganizations', angular.copy($scope.supportedOrganizations));
        };

        //Add organization
        $scope.showOrganizationAdd = false;
        $scope.organizationAddShow = function () {
            $scope.organizationAdd = {
                orgName: '', orgWebsite: ''
            };
            $scope.showOrganizationAdd = true;
        };
        $scope.organizationAddConfirm = function () {
            $scope.supportedOrganizations.push($scope.organizationAdd);
            $scope.profile.setRemoteProperty('supportedOrganizations', angular.copy($scope.supportedOrganizations));
            $scope.showOrganizationAdd = false;
        };
    }]);